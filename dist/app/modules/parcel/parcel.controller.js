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
exports.parcelController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const parcel_service_1 = require("./parcel.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = req.user.userId;
    const payload = Object.assign(Object.assign({}, req.body), { sender: senderId });
    const user = yield parcel_service_1.parcelService.createParcel(payload, req.user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel create Successfully",
        data: user,
    });
}));
const updateParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.parcelId;
    const { status, note, isBlocked, rescheduledDate, returnReason } = req.body;
    const jwtUser = req.user;
    const payload = {
        parcelId,
        status,
        note,
        isBlocked,
        returnReason,
        rescheduledDate,
        userId: jwtUser.userId,
        email: jwtUser.email,
        role: jwtUser.role
    };
    const result = yield parcel_service_1.parcelService.updateParcelStatus(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel update Successfully",
        data: result,
    });
}));
const receiverIncomingParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield parcel_service_1.parcelService.receiverUserAllParcelInfo(userId, role);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel Retrieve Successfully",
        data: result
    });
}));
const adminGetAllParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.parcelService.adminGetAllParcel();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel Retrieve Successfully",
        data: result
    });
}));
const statusLog = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.parcelId;
    const result = yield parcel_service_1.parcelService.statusLog(parcelId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel status log Retrieve Successfully",
        data: result
    });
}));
const deleteParcel = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.parcelId;
    const userInfo = req.user;
    const result = yield parcel_service_1.parcelService.deleteParcel(parcelId, userInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Parcel deleteParcel Successfully",
        data: result
    });
}));
exports.parcelController = {
    createParcel,
    updateParcel,
    receiverIncomingParcel,
    adminGetAllParcel,
    statusLog,
    deleteParcel
};
