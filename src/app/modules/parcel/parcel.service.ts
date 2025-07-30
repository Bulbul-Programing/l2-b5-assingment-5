import { AppError } from "../../errorHandler/AppError";
import { UserModel } from "../User/user.model";
import { TParcel } from "./parcel.interface";
import httpStatus from 'http-status-codes';
import { ParcelModel } from "./parcel.mode";

const createParcel = async (payload: TParcel) => {
    const isExistUser = await UserModel.findById(payload.sender)
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'Sender Not found')
    }
    const isExistReceiver = await UserModel.findById(payload.receiver)
    if (!isExistReceiver) {
        throw new AppError(httpStatus.NOT_FOUND, 'Receiver Not found')
    }

    const result = await ParcelModel.create(payload)

    return result
}

export const parcelService = {
    createParcel
}