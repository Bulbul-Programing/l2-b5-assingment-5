import { Types } from "mongoose";

export type ParcelStatus =
    | 'Requested'
    | 'Approved'
    | 'Dispatched'
    | 'In Transit'
    | 'Delivered'
    | 'Cancelled'
    | 'Blocked'
    ;

export interface IParcelStatusLog {
    status: ParcelStatus;
    location?: string;
    note?: string;
    timestamp?: Date;
    updatedBy: Types.ObjectId;
}


export type TParcel = {
    trackingId?: string;
    sender: Types.ObjectId;
    senderAddress?: string;
    receiver: Types.ObjectId;
    receiverAddress?: string;
    weight: number;
    deliveryFee?: number;
    status?: ParcelStatus;
    isBlocked?: boolean;
    statusLog?: IParcelStatusLog[];
}
