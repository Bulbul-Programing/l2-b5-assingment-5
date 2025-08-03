import z from "zod";


export const couponValidationSchema = z.object({
    code: z.string().nonempty("Code is required").toUpperCase(),
    type: z.enum(['percentage', 'fixed']),
    value: z.number().min(0, "Value must be greater than or equal to 0"),
    createdBy: z.string().optional(),
    isActive: z.boolean().optional()
});