import { AppError } from "../../errorHandler/AppError";
import { UserModel } from "../User/user.model";
import { IParcelStatusLog, ParcelStatus, TParcel } from "./parcel.interface";
import httpStatus from 'http-status-codes';
import { ParcelModel } from "./parcel.mode";
import { TJwtPayload } from "../../interface/jwtPayload";
import { Role } from "../User/user.interface";
import { ROLE_ACTIONS, STATUS_FLOW } from "./parcel.utils";
import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

type updateParcelStatusParam = {
    userId: Types.ObjectId,
    email: string,
    role: Role,
    parcelId: string,
    status: ParcelStatus,
    note?: string,
    isBlocked: boolean,
    returnReason: string,
    rescheduledDate: Date
}

const createParcel = async (payload: TParcel, jwtUser: JwtPayload) => {
    if (payload.sender !== jwtUser.userId) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Your are not Authorize!')
    }

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
        status: 'requested',
        updatedBy: payload.sender,
    }
    payload.statusLog = [statusLog]

    const result = await ParcelModel.create(payload)

    return result
}

const updateParcelStatus = async (payload: updateParcelStatusParam) => {
    const status = payload.status.toLowerCase() as ParcelStatus;
    const parcel = await ParcelModel.findById(payload.parcelId);

    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, 'Parcel Not Found!');
    }

    // Verify ownership for sender/receiver actions
    if (payload.role === 'sender' && !parcel.sender.equals(payload.userId)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized for this action!');
    }

    if (payload.role === 'receiver' && !parcel.receiver.equals(payload.userId)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized for this action');
    }

    // Validate status transition
    const allowedStatuses = STATUS_FLOW[parcel.status as ParcelStatus];
    if (!allowedStatuses.includes(status)) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Invalid status transition from ${parcel.status} to ${status}`
        );
    }

    // Strict role-based validation
    if (!ROLE_ACTIONS[payload.role].includes(status)) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Role ${payload.role} cannot set status to ${status}`
        );
    }

    // Special field requirements
    const newStatusLog: IParcelStatusLog = {
        status,
        updatedBy: payload.userId,
        note: payload.note
    };

    if (status === 'returned' && !payload.returnReason) {
        throw new AppError(httpStatus.BAD_REQUEST, 'returnReason is required');
    }
    if (status === 'rescheduled' && !payload.rescheduledDate) {
        throw new AppError(httpStatus.BAD_REQUEST, 'rescheduledDate is required');
    }

    if (status === 'returned') newStatusLog.returnReason = payload.returnReason;
    if (status === 'rescheduled') newStatusLog.rescheduledDate = payload.rescheduledDate;

    // Update parcel
    parcel.statusLog = parcel.statusLog || [];
    parcel.statusLog.push(newStatusLog);

    const result = await ParcelModel.findByIdAndUpdate(
        payload.parcelId,
        { status, statusLog: parcel.statusLog },
        { new: true }
    );

    return result;
};

const receiverUserAllParcelInfo = async (userId: string, userRole: string) => {
    if (userRole === 'sender') {
        const result = await ParcelModel.find({ sender: userId })
        return result
    }
    if (userRole === 'receiver') {
        const result = await ParcelModel.find({ receiver: userId })
        return result
    }
}

const statusLog = async (parcelId: string) => {
    const parcel = await ParcelModel.findById(parcelId).populate('statusLog.updatedBy', 'name email role note -_id').select('trackingId statusLog status')

    if (!parcel) {
        throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found')
    }

    const customizedData = {
        trackingId: parcel.trackingId,
        currentStatus: parcel.status,
        history: parcel?.statusLog
    }

    return customizedData
}

export const parcelService = {
    createParcel,
    updateParcelStatus,
    receiverUserAllParcelInfo,
    statusLog
}