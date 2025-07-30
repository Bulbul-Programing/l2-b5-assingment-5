import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AuthService } from "./auth.service";


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.loginUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User Login Successfully",
        data: user,
    })
})

export const authController = {
    login
}