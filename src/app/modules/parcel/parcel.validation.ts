
import { z } from 'zod';

const ParcelStatusEnum = z.enum([
    'Requested',
    'Approved',
    'Dispatched',
    'InTransit',
    'Delivered',
    'Canceled',
]);

export const ParcelStatusLogSchema = z.object({
    status: ParcelStatusEnum,
    location: z.string().optional(),
    note: z.string().optional(),
    timestamp: z.string(),
    updatedBy: z.string(),
});

export const ParcelBookingSchema = z.object({
    trackingId: z.string({error : 'Tracking Id is Required'}).optional(),
    sender: z.string(),
    receiver: z.string(),
    weight: z.number(),
    deliveryFee: z.number().optional(),
    address: z.string(),
    status: ParcelStatusEnum.optional(),
    isBlocked: z.boolean().optional(),
    statusLog: z.array(ParcelStatusLogSchema).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});
