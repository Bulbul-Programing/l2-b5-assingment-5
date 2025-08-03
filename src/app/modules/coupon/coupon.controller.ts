import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { couponService } from "./coupon.service"
import httpStatus from 'http-status-codes';

const creteCoupon = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let couponCodeData = req.body
    couponCodeData.createdBy = req.user.userId
    const result = await couponService.createCoupon(couponCodeData)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Coupon code create Successfully",
        data: result
    })
})

const getSingleCoupon = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const code = req.params.code
    const result = await couponService.getSingleCoupon(code)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Coupon code retrieve Successfully",
        data: result
    })
})

export const couponController = {
    creteCoupon,
    getSingleCoupon
}