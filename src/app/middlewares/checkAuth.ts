import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { AppError } from "../errorHandler/AppError";
import { verifyToken } from "../utils/jwtToken";
import { UserModel } from "../modules/User/user.model";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "Token Not found")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExist = await UserModel.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (isUserExist.isBlocked) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not authorized for this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}