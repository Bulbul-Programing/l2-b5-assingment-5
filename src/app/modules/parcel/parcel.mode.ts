import mongoose, { Schema, Types } from 'mongoose';
import { TParcel } from './parcel.interface';
import { createTrackingId } from '../../utils/createTrackingId';

const ParcelStatusEnum = [
  'requested',
  'approved',
  'dispatched',
  'in-transit',
  'delivered',
  'cancelled',
  'blocked',
  'returned',
  'rescheduled'
] as const;

const ParcelStatusLogSchema = new Schema(
  {
    status: { type: String, enum: ParcelStatusEnum, required: true },
    location: { type: String },
    note: { type: String },
    updatedBy: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    returnReason: { type: String },
    rescheduledDate: { type: Date }
  },
  { _id: false, timestamps: true }
);

const ParcelSchema = new Schema<TParcel>(
  {
    trackingId: { type: String, unique: true },
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    senderAddress: { type: String },
    receiver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiverAddress: { type: String },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    deliveryFee: { type: Number },
    coupon: { type: String, required: false },
    status: { type: String, enum: ParcelStatusEnum, default: 'requested' },
    isBlocked: { type: Boolean, default: false },
    statusLog: { type: [ParcelStatusLogSchema] },
  },
  { timestamps: true }
);

ParcelSchema.pre('save', async function (next) {
  if (!this.trackingId) {
    this.trackingId = createTrackingId();
  }
  next();
});

export const ParcelModel = mongoose.model('Parcel', ParcelSchema);