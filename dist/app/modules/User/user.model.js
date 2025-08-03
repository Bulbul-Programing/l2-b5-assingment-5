"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, require: true },
    address: { type: String, required: true },
    phone: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (number) {
                return /^(?:\+8801[3-9]\d{8}|8801[3-9]\d{8}|01[3-9]\d{8})$/.test(number);
            },
            message: props => `${props.value} is not a valid Bangladeshi phone number!`
        }
    },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.sender },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.phone.startsWith('01')) {
            this.phone = '+880' + this.phone.slice(1);
        }
        else if (this.phone.startsWith('880')) {
            this.phone = '+' + this.phone;
        }
        const hashedPassword = yield bcrypt_1.default.hash(this.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        this.password = hashedPassword;
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)('user', UserSchema);
