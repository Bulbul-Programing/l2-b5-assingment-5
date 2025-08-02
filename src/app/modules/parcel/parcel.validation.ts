
import { z } from 'zod';

const ParcelStatusEnum = z.enum([
    'requested',
    'approved',
    'dispatched',
    'in transit',
    'delivered',
    'cancelled',
    'returned',
    'rescheduled'
]);

export const ParcelStatusLogSchema = z.object({
    status: ParcelStatusEnum,
    location: z.string().optional(),
    note: z.string().optional(),
    updatedBy: z.string(),
    returnReason: z.string().optional(),
    rescheduledDate: z.date().optional()
});

export const ParcelBookingSchema = z.object({
    trackingId: z.string({ error: 'Tracking Id is Required' }).optional(),
    sender: z.string(),
    receiver: z.string(),
    weight: z.number(),
    deliveryFee: z.number().optional(),
    receiverAddress: z.string(),
    status: ParcelStatusEnum.optional(),
    isBlocked: z.boolean().optional(),
    statusLog: z.array(ParcelStatusLogSchema).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const updateParcelStatus = z.object({
    status: ParcelStatusEnum.optional(),
    note: z.string().optional(),
    isBlocked: z.boolean().optional(),
    returnReason: z.string().optional(),
    rescheduledDate: z.string().optional()
});
