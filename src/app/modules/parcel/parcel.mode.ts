import mongoose, { Schema, Types } from 'mongoose';
import { TParcel } from './parcel.interface';
import { createTrackingId } from '../../utils/createTrackingId';

export type ParcelStatus =
    | 'Requested'
    | 'Approved'
    | 'Dispatched'
    | 'InTransit'
    | 'Delivered'
    | 'Canceled';

const ParcelStatusEnum = [
    'Requested',
    'Approved',
    'Dispatched',
    'InTransit',
    'Delivered',
    'Canceled',
] as const;

const ParcelStatusUpdateBy = ['admin', 'deliveryMan'] as const;

const ParcelStatusLogSchema = new Schema(
    {
        status: { type: String, enum: ParcelStatusEnum, required: true },
        location: { type: String },
        note: { type: String },
        timestamp: { type: String, required: true },
        updatedBy: { type: String, enum: ParcelStatusUpdateBy }
    },
    { _id: false }
);

const ParcelSchema = new Schema<TParcel>(
    {
        trackingId: { type: String },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        weight: { type: Number, required: true },
        deliveryFee: { type: Number },
        address: { type: String, required: true },
        status: { type: String, enum: ParcelStatusEnum, default: 'Requested' },
        isBlocked: { type: Boolean, default: false },
        statusLog: { type: [ParcelStatusLogSchema] },
    },
    { timestamps: true }
);

ParcelSchema.pre('save', async function (next) {
    this.trackingId = createTrackingId()
    this.deliveryFee = Number(this.weight) * 8
    next()
})

export const ParcelModel = mongoose.model('Parcel', ParcelSchema);
