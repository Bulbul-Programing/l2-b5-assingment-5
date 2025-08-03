"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelStatus = exports.ParcelBookingSchema = exports.ParcelStatusLogSchema = void 0;
const zod_1 = require("zod");
const ParcelStatusEnum = zod_1.z.enum([
    'requested',
    'approved',
    'dispatched',
    'in-transit',
    'delivered',
    'cancelled',
    'returned',
    'rescheduled'
]);
exports.ParcelStatusLogSchema = zod_1.z.object({
    status: ParcelStatusEnum,
    location: zod_1.z.string().optional(),
    note: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string(),
    returnReason: zod_1.z.string().optional(),
    rescheduledDate: zod_1.z.date().optional()
});
exports.ParcelBookingSchema = zod_1.z.object({
    trackingId: zod_1.z.string({ error: 'Tracking Id is Required' }).optional(),
    sender: zod_1.z.string(),
    receiver: zod_1.z.string(),
    weight: zod_1.z.number(),
    deliveryFee: zod_1.z.number().optional(),
    receiverAddress: zod_1.z.string().optional(),
    status: ParcelStatusEnum.optional(),
    isBlocked: zod_1.z.boolean().optional(),
    statusLog: zod_1.z.array(exports.ParcelStatusLogSchema).optional(),
    coupon: zod_1.z.string().optional()
});
exports.updateParcelStatus = zod_1.z.object({
    status: ParcelStatusEnum.optional(),
    note: zod_1.z.string().optional(),
    isBlocked: zod_1.z.boolean().optional(),
    returnReason: zod_1.z.string().optional(),
    rescheduledDate: zod_1.z.string().optional()
});
