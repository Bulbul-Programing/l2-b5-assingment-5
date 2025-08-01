import { AppError } from "../../errorHandler/AppError";
import { UserModel } from "../User/user.model";
import { IParcelStatusLog, ParcelStatus, TParcel } from "./parcel.interface";
import httpStatus from 'http-status-codes';
import { ParcelModel } from "./parcel.mode";
import { TJwtPayload } from "../../interface/jwtPayload";
import { Role } from "../User/user.interface";
import { STATUS_FLOW } from "./parcel.utils";
import { Types } from "mongoose";

type updateParcelStatusParam = {
    userId: Types.ObjectId,
    email: string,
    role: Role,
    parcelId: string,
    status: ParcelStatus,
    note?: string
}

const createParcel = async (payload: TParcel) => {
    const isExistUser = await UserModel.findById(payload.sender)
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'Sender Not found')
    }
    const isExistReceiver = await UserModel.findById(payload.receiver)
    if (!isExistReceiver) {
        throw new AppError(httpStatus.NOT_FOUND, 'Receiver Not found')
    }

    payload.senderAddress = payload.senderAddress || isExistUser.address
    payload.receiverAddress = payload.receiverAddress || isExistReceiver.address

    const statusLog: IParcelStatusLog = {
        status: 'Requested',
        updatedBy: payload.sender,
    }
    payload.statusLog = [statusLog]

    const result = await ParcelModel.create(payload)

    return result
}

const updateParcelStatus = async (payload: updateParcelStatusParam) => {

    const parcel = await ParcelModel.findById(payload.parcelId)
    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, 'Parcel Not Found!')
    }

    if (!parcel.status) {
        throw new AppError(httpStatus.NOT_FOUND, 'Parcel Status Not Found!')
    }

    if (payload.role === 'sender') {
        if (!parcel.sender.equals(payload.userId)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for this action!')
        }
    }
    if (payload.role === 'receiver') {
        if (!parcel.receiver.equals(payload.userId)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized for this action')
        }
    }


    const allowedStatuses = STATUS_FLOW[parcel.status as keyof typeof STATUS_FLOW];



    if (!allowedStatuses.includes((payload.status))) {
        throw new AppError(httpStatus.NOT_FOUND, `Invalid status transition from ${parcel.status} to ${payload.status}`)
    }

    if (payload.role === 'receiver' && payload.status !== 'Delivered') {
        throw new AppError(httpStatus.NOT_FOUND, 'Receivers can only mark parcels as Delivered!')
    }

    if (payload.role === 'sender' && payload.status !== 'Cancelled') {
        throw new AppError(httpStatus.NOT_FOUND, 'Senders can only cancel parcels!')
    }

    if (payload.status === 'Delivered') {
        throw new AppError(httpStatus.NOT_FOUND, 'You can only confirm delivery for your own parcels !')
    }
    parcel.statusLog?.push({
        status: payload.status,
        updatedBy: payload.userId,
    })

    const updatePayload = {
        status: payload.status,
        statusLog: parcel.statusLog
    }

    const result = await ParcelModel.findByIdAndUpdate(payload.parcelId, updatePayload)
    return result
}

export const parcelService = {
    createParcel,
    updateParcelStatus
}