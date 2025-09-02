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

    const { password: pass, ...rest } = isExistUser.toObject()

    return rest

}

const getMe = async (payload: string) => {
    const isExistUser = await UserModel.findOne({ email: payload }).select({ password: 0 })

    if (!isExistUser) {
        throw new AppError(404, 'User Not Found!')
    }

    return isExistUser
}

export const AuthService = {
    loginUser,
    getMe
}