
import { z } from 'zod';

const ParcelStatusEnum = z.enum([
    'requested',
    'approved',
    'dispatched',
    'in-transit',
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
    sender: z.string().optional(),
    receiver: z.string(),
    height: z.number({ message: 'Height is required' }).min(1, { message: 'Height must be greater than 0' }),
    width: z.number({ message: 'Width is required' }).min(1, { message: 'Width must be greater than 0' }),
    weight: z.number({ message: 'weight is required' }).min(1, { message: 'weight must be greater than 0' }),
    deliveryFee: z.number().optional(),
    receiverAddress: z.string().optional(),
    status: ParcelStatusEnum.optional(),
    isBlocked: z.boolean().optional(),
    statusLog: z.array(ParcelStatusLogSchema).optional(),
    coupon: z.string().optional()
});

export const updateParcelStatus = z.object({
    status: ParcelStatusEnum.optional(),
    note: z.string().optional(),
    isBlocked: z.boolean().optional(),
    returnReason: z.string().optional(),
    rescheduledDate: z.string().optional()
});
