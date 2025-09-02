import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { userService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.userRegister(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Register Successfully",
        data: user,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const updateData = req.body
    const jwtUserInfo = req.user
    const user = await userService.updateUser(userId, updateData, jwtUserInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Update Successfully",
        data: user,
    })
})

const getReceiver = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await userService.getReceiver()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Receiver data retrieve Successfully",
        data: result,
    })
})

export const userController = {
    createUser,
    updateUser,
    getReceiver
}