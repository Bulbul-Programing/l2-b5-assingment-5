import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { parcelService } from "./parcel.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';

const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await parcelService.createParcel(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel create Successfully",
        data: user,
    })
})

export const parcelController = {
    createParcel
}