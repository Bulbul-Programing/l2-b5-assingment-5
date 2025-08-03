import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { parcelService } from "./parcel.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AppError } from "../../errorHandler/AppError";

const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await parcelService.createParcel(req.body, req.user)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel create Successfully",
        data: user,
    })
})

const updateParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId
    const { status, note, isBlocked, rescheduledDate, returnReason } = req.body
    const jwtUser = req.user

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
    }

    const result = await parcelService.updateParcelStatus(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel update Successfully",
        data: result,
    })
})

const receiverIncomingParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = req.user
    const result = await parcelService.receiverUserAllParcelInfo(userId, role)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel Retrieve Successfully",
        data: result
    })
})

const statusLog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId
    const result = await parcelService.statusLog(parcelId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel status log Retrieve Successfully",
        data: result
    })
})

const deleteParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId
    const userInfo = req.user
    const result = await parcelService.deleteParcel(parcelId, userInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Parcel deleteParcel Successfully",
        data: result
    })
})

export const parcelController = {
    createParcel,
    updateParcel,
    receiverIncomingParcel,
    statusLog,
    deleteParcel
}