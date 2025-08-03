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
exports.couponService = void 0;
const AppError_1 = require("../../errorHandler/AppError");
const coupon_model_1 = require("./coupon.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCoupon = yield coupon_model_1.CouponModel.findOne({ code: payload.code });
    if (isExistCoupon) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_GATEWAY, 'Coupon is Already Exists!');
    }
    const result = yield coupon_model_1.CouponModel.create(payload);
    return result;
});
const getSingleCoupon = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCoupon = yield coupon_model_1.CouponModel.findOne({ code });
    if (!isExistCoupon) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, 'Token Not Found!');
    }
    return isExistCoupon;
});
exports.couponService = {
    createCoupon,
    getSingleCoupon
};
