import { Types } from "mongoose";

export type ParcelStatus =
    | 'Requested'
    | 'Approved'
    | 'Dispatched'
    | 'InTransit'
    | 'Delivered'
    | 'Canceled';

export type ParcelStatusUpdateBy = 'admin' | 'deliveryMan'

export interface IParcelStatusLog {
    status: ParcelStatus;
    location?: string;
    note?: string;
    timestamp: string;
    updatedBy: ParcelStatusUpdateBy;
}


export type TParcel = {
    trackingId?: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    weight: number;
    deliveryFee?: number;
    address: string;
    status?: ParcelStatus;
    isBlocked?: boolean;
    statusLog?: IParcelStatusLog[];
    createdAt?: string;
    updatedAt?: string;
}
