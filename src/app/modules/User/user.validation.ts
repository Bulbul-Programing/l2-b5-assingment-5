import z from "zod";
import { Role } from "./user.interface";

export const createUserValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string('Password is required'),
    phone: z.string().optional(),
    role: z.enum(Object.values(Role)).default(Role.SENDER),
    isBlocked: z.boolean().default(false),
})

export const updateUserValidationSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    phone: z.string().optional(),
    role: Object.values(Role),
    isBlocked: z.boolean().default(false).optional(),
})