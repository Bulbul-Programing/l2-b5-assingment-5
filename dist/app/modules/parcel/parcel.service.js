"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelService = void 0;
const AppError_1 = require("../../errorHandler/AppError");
const user_model_1 = require("../User/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const parcel_mode_1 = require("./parcel.mode");
const parcel_utils_1 = require("./parcel.utils");
const coupon_model_1 = require("../coupon/coupon.model");
const createParcel = (payload, jwtUser) => __awaiter(void 0, void 0, void 0, function* () {
    payload.deliveryFee = payload.weight * 10;
    if (payload.sender !== jwtUser.userId) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'Your are not Authorize!');
    }
    if (payload.coupon) {
        const getCoupon = yield coupon_model_1.CouponModel.findOne({ code: payload.coupon });
        if (!getCoupon) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Coupon Not Found!');
        }
        const discount = getCoupon.type === 'percentage' ? ((payload.deliveryFee * getCoupon.value) / 100) : getCoupon.value;
        payload.deliveryFee = payload.deliveryFee - discount;
    }
    const isExistSender = yield user_model_1.UserModel.findById(payload.sender);
    if (!isExistSender) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Sender Not found');
    }
    const isExistReceiver = yield user_model_1.UserModel.findById(payload.receiver);
    if (!isExistReceiver) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Receiver Not found');
    }
    payload.sender = isExistSender._id;
    payload.senderAddress = payload.senderAddress || isExistSender.address;
    payload.receiverAddress = payload.receiverAddress || isExistReceiver.address;
    const statusLog = {
        status: 'requested',
        updatedBy: payload.sender,
    };
    payload.statusLog = [statusLog];
    const result = yield parcel_mode_1.ParcelModel.create(payload);
    return result;
});
const updateParcelStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const status = payload.status.toLowerCase();
    const parcel = yield parcel_mode_1.ParcelModel.findById(payload.parcelId);
    if (!parcel) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Parcel Not Found!');
    }
    // Verify ownership for sender/receiver actions
    if (payload.role === 'sender' && !parcel.sender.equals(payload.userId)) {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, 'Not authorized for this action!');
    }
    if (payload.role === 'receiver' && !parcel.receiver.equals(payload.userId)) {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, 'Not authorized for this action');
    }
    // Validate status transition
    const allowedStatuses = parcel_utils_1.STATUS_FLOW[parcel.status];
    if (!allowedStatuses.includes(status)) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, `Invalid status transition from ${parcel.status} to ${status}`);
    }
    // Strict role-based validation
    if (!parcel_utils_1.ROLE_ACTIONS[payload.role].includes(status)) {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, `Role ${payload.role} cannot set status to ${status}`);
    }
    // Special field requirements
    const newStatusLog = {
        status,
        updatedBy: payload.userId,
        note: payload.note
    };
    if (status === 'returned' && !payload.returnReason) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'returnReason is required');
    }
    if (status === 'rescheduled' && !payload.rescheduledDate) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'rescheduledDate is required');
    }
    if (status === 'returned')
        newStatusLog.returnReason = payload.returnReason;
    if (status === 'rescheduled')
        newStatusLog.rescheduledDate = payload.rescheduledDate;
    // Update parcel
    parcel.statusLog = parcel.statusLog || [];
    parcel.statusLog.push(newStatusLog);
    const result = yield parcel_mode_1.ParcelModel.findByIdAndUpdate(payload.parcelId, { status, statusLog: parcel.statusLog }, { new: true });
    return result;
});
const receiverUserAllParcelInfo = (userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    if (userRole === 'sender') {
        const result = yield parcel_mode_1.ParcelModel.find({ sender: userId });
        return result;
    }
    if (userRole === 'receiver') {
        const result = yield parcel_mode_1.ParcelModel.find({ receiver: userId });
        return result;
    }
});
const statusLog = (parcelId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_mode_1.ParcelModel.findById(parcelId).populate('statusLog.updatedBy', 'name email role note -_id').select('trackingId statusLog status');
    console.log(parcel);
    if (!parcel) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Parcel not found');
    }
    const customizedData = {
        trackingId: parcel.trackingId,
        currentStatus: parcel.status,
        history: parcel === null || parcel === void 0 ? void 0 : parcel.statusLog
    };
    return customizedData;
});
const deleteParcel = (parcelId, jwtUser) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistParcel = yield parcel_mode_1.ParcelModel.findById(parcelId);
    if (!isExistParcel) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Parcel Not Found!');
    }
    if (!isExistParcel.sender.equals(jwtUser.userId) && jwtUser.role !== 'admin') {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'You are not authorize for this action');
    }
    const deleteParcel = yield parcel_mode_1.ParcelModel.findByIdAndDelete(parcelId);
    return deleteParcel;
});
exports.parcelService = {
    createParcel,
    updateParcelStatus,
    receiverUserAllParcelInfo,
    statusLog,
    deleteParcel
};
