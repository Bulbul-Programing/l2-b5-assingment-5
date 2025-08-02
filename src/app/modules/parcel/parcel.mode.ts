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
    updatedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    returnReason: { type: String },
    rescheduledDate: { type: Date }
  },
  { _id: false, timestamps: true }
);

const ParcelSchema = new Schema<TParcel>(
  {
    trackingId: { type: String, unique: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderAddress: { type: String },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverAddress: { type: String },
    weight: { type: Number, required: true },
    deliveryFee: { type: Number },
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
  if (!this.deliveryFee) {
    this.deliveryFee = Number(this.weight) * 8;
  }
  next();
});

export const ParcelModel = mongoose.model('Parcel', ParcelSchema);