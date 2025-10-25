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
    const result = await UserModel.find({ role: 'receiver', isBlocked: false }).select({ _id: 1, name: 1, phone: 1 })

    return result
}

const getAllUsers = async () => {
    const result = await UserModel.find().select({ _id: 1, name: 1, phone: 1, email: 1, address: 1, isBlocked: 1, role: 1 })
    return result
}

const deleteUser = async (userId: string) => {
    const isExistUser = await UserModel.findOne({ _id: userId })

    if (!isExistUser) {
        throw new AppError(404, "User not found!")
    }

    await UserModel.deleteOne({ _id: userId })
}

export const userService = {
    userRegister,
    updateUser,
    getReceiver,
    getAllUsers,
    deleteUser
}