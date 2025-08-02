import { Types } from "mongoose";

export type ParcelStatus =
  | 'requested'
  | 'approved'
  | 'dispatched'
  | 'in-transit'
  | 'delivered'
  | 'cancelled'
  | 'blocked'
  | 'returned'
  | 'rescheduled';

export interface IParcelStatusLog {
  status: ParcelStatus;
  location?: string;
  note?: string;
  timestamp?: Date;
  updatedBy: Types.ObjectId;
  returnReason?: string;
  rescheduledDate?: Date;
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