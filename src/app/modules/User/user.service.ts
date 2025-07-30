import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from 'http-status-codes';
import { AppError } from "../../errorHandler/AppError";

const userRegister = async (payload: TUser) => {
    const isExistUser = await UserModel.findOne({ email: payload.email })

    if (isExistUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User Already exist!')
    }

    const createUser = await UserModel.create(payload)

    return createUser

}

export const userService = {
    userRegister
}