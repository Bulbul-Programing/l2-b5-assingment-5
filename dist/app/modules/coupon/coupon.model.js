"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModel = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.CouponModel = (0, mongoose_1.model)('coupon', couponSchema);
