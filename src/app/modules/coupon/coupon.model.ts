import { model, Schema } from "mongoose";
import { TCoupon } from "./coupon.interface";


const couponSchema = new Schema<TCoupon>({
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const CouponModel = model<TCoupon>('coupon', couponSchema)