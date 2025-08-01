import mongoose, { Schema, Types } from 'mongoose';
import { TParcel } from './parcel.interface';
import { createTrackingId } from '../../utils/createTrackingId';
import { ref } from 'process';

const ParcelStatusEnum = [
    'Requested',
    'Approved',
    'Dispatched',
    'In Transit',
    'Delivered',
    'Canceled',
] as const;

const ParcelStatusUpdateBy = ['admin', 'deliveryMan'] as const;

const ParcelStatusLogSchema = new Schema(
    {
        status: { type: String, enum: ParcelStatusEnum, required: true },
        location: { type: String },
        note: { type: String },
        updatedBy: { type: Schema.Types.ObjectId, require: true, ref: 'user' }
    },
    { _id: false, timestamps: true }
);

const ParcelSchema = new Schema<TParcel>(
    {
        trackingId: { type: String },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        senderAddress: { type: String},
        receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiverAddress: { type: String},
        weight: { type: Number, required: true },
        deliveryFee: { type: Number },
        status: { type: String, enum: ParcelStatusEnum, default: 'Requested', required: true },
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
