import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { parcelService } from "./parcel.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { jwt } from "zod";

const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await parcelService.createParcel(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel create Successfully",
        data: user,
    })
})

const updateParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId
    const { status, note } = req.body
    const jwtUser = req.user

    const payload = {
        parcelId,
        status,
        note,
        userId: jwtUser.userId,
        email: jwtUser.email,
        role: jwtUser.role
    }

    const user = await parcelService.updateParcelStatus(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel update Successfully",
        data: {},
    })
})

export const parcelController = {
    createParcel,
    updateParcel
}