import z from "zod";

export const LoginValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string('Password is required'),
});