import { AppError } from "../../errorHandler/AppError";
import { TCoupon } from "./coupon.interface";
import { CouponModel } from "./coupon.model";
import httpStatus from 'http-status-codes';

const createCoupon = async (payload: TCoupon) => {
    const isExistCoupon = await CouponModel.findOne({ code: payload.code })
    if (isExistCoupon) {
        throw new AppError(httpStatus.BAD_GATEWAY, 'Coupon is Already Exists!')
    }
    const result = await CouponModel.create(payload)
    return result
}

const getSingleCoupon = async (code: string) => {
    const isExistCoupon = await CouponModel.findOne({ code })
    if (!isExistCoupon) {
        throw new AppError(httpStatus.NOT_FOUND, 'Token Not Found!')
    }

    return isExistCoupon
}

export const couponService = {
    createCoupon,
    getSingleCoupon
}