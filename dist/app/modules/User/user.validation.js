"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserValidationSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required'),
    email: zod_1.default.string().email('Invalid email address'),
    password: zod_1.default.string('Password is required'),
    phone: zod_1.default.string().min(11, "Minimum Number 11 digit"),
    address: zod_1.default.string().min(1, 'Address is required'),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).default(user_interface_1.Role.sender),
    isBlocked: zod_1.default.boolean().default(false),
});
exports.updateUserValidationSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required').optional(),
    phone: zod_1.default.string().optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    isBlocked: zod_1.default.boolean().optional(),
});
