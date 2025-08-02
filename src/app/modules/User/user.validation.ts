import z from "zod";
import { Role } from "./user.interface";

export const createUserValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string('Password is required'),
    phone: z.string().min(11, "Minimum Number 11 digit"),
    address : z.string().min(1, 'Address is required'),
    role: z.enum(Object.values(Role)).default(Role.sender),
    isBlocked: z.boolean().default(false),
})

export const updateUserValidationSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    phone: z.string().optional(),
    role: z.enum(Object.values(Role)).optional(),
    isBlocked: z.boolean().optional(),
})