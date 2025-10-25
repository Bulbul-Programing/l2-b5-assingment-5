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
exports.userService = void 0;
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = require("../../errorHandler/AppError");
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (isExistUser) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'User Already exist!');
    }
    const createUser = yield user_model_1.UserModel.create(payload);
    return createUser;
});
const updateUser = (userId, payload, jwtUserInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (jwtUserInfo.role !== 'admin' && (payload.role || payload.isBlocked)) {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, 'Your are not authorized for this action');
    }
    if (userId !== jwtUserInfo.userId && jwtUserInfo.role !== 'admin') {
        throw new AppError_1.AppError(http_status_codes_1.default.UNAUTHORIZED, 'Your are not authorized for this action!');
    }
    const isExistUser = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (isExistUser) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, 'User Already exist!');
    }
    const updateUser = yield user_model_1.UserModel.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return updateUser;
});
const getReceiver = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({ role: 'receiver', isBlocked: false }).select({ _id: 1, name: 1, phone: 1 });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select({ _id: 1, name: 1, phone: 1, email: 1, address: 1, isBlocked: 1, role: 1 });
    return result;
});
exports.userService = {
    userRegister,
    updateUser,
    getReceiver,
    getAllUsers
};
