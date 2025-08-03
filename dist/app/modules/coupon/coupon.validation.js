"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.couponValidationSchema = zod_1.default.object({
    code: zod_1.default.string().nonempty("Code is required").toUpperCase(),
    type: zod_1.default.enum(['percentage', 'fixed']),
    value: zod_1.default.number().min(0, "Value must be greater than or equal to 0"),
    createdBy: zod_1.default.string().optional(),
    isActive: zod_1.default.boolean().optional()
});
