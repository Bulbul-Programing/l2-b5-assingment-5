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
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const jwtToken_1 = require("../../utils/jwtToken");
const env_1 = require("../../config/env");
const setCookies_1 = require("../../utils/setCookies");
const login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthService.loginUser(req.body);
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwtToken_1.creteToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwtToken_1.creteToken)(jwtPayload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRES);
    (0, setCookies_1.setCookies)(res, { accessToken, refreshToken });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "User Login Successfully",
        data: {
            accessToken,
            refreshToken,
            user
        },
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "User Logout Successfully",
        data: null
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.user;
    const result = yield auth_service_1.AuthService.getMe(userInfo.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.ACCEPTED,
        message: "User Info Retrieve Successfully",
        data: result
    });
}));
exports.authController = {
    login,
    logout,
    getMe
};
