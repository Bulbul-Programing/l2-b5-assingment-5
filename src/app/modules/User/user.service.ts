import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from 'http-status-codes';
import { AppError } from "../../errorHandler/AppError";
import { TJwtPayload } from "../../interface/jwtPayload";
import { JwtPayload } from "jsonwebtoken";

const userRegister = async (payload: TUser) => {
    const isExistUser = await UserModel.findOne({ email: payload.email })

    if (isExistUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User Already exist!')
    }

    const createUser = await UserModel.create(payload)

    return createUser

}

const updateUser = async (userId: string, payload: Partial<TUser>, jwtUserInfo: JwtPayload) => {

    if (jwtUserInfo.role !== 'admin' && (payload.role || payload.isBlocked)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized for this action')
    }
    if (userId !== jwtUserInfo.userId && jwtUserInfo.role !== 'admin') {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized for this action!')
    }

    const isExistUser = await UserModel.findOne({ email: payload.email })

    if (isExistUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User Already exist!')
    }

    const updateUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return updateUser

}

const getReceiver = async () => {
    const result = await UserModel.find({ role: 'receiver' }).select({ _id: 1, name: 1, phone : 1 })

    return result

}

export const userService = {
    userRegister,
    updateUser,
    getReceiver
}