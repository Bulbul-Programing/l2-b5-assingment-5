import { envVars } from "../../config/env";
import { AppError } from "../../errorHandler/AppError"
import { creteToken } from "../../utils/jwtToken";
import { UserModel } from "../User/user.model"
import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';

const loginUser = async (payload: { email: string, password: string }) => {
    const isExistUser = await UserModel.findOne({ email: payload.email })
    if (!isExistUser) {
        throw new AppError(404, 'User Not Found!')
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isExistUser.password)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password')
    }

    const jwtPayload = {
        userId: isExistUser._id,
        email: isExistUser.email,
        role: isExistUser.role
    }

    const accessToken = creteToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    const refreshToken = creteToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const { password: pass, ...rest } = isExistUser.toObject()

    return {
        accessToken,
        refreshToken,
        user: rest
    }

}


export const AuthService = {
    loginUser
}