import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AuthService } from "./auth.service";
import { creteToken } from "../../utils/jwtToken";
import { envVars } from "../../config/env";
import { setCookies } from "../../utils/setCookies";


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.loginUser(req.body)

    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = creteToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    const refreshToken = creteToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    setCookies(res, { accessToken, refreshToken })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User Login Successfully",
        data: {
            accessToken,
            refreshToken,
            user
        },
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User Logout Successfully",
        data: null
    })
})

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.user

    const result = await AuthService.getMe(userInfo.email)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.ACCEPTED,
        message: "User Info Retrieve Successfully",
        data: result
    })
})

export const authController = {
    login,
    logout,
    getMe
}