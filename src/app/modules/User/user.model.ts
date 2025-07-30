import { model, Schema } from "mongoose";
import { Role, TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import { envVars } from "../../config/env";


const UserSchema: Schema<TUser> = new Schema<TUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, require: true },
        phone: { type: String },
        role: { type: String, enum: Object.values(Role), default: Role.sender },
        isBlocked: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, Number(envVars.BCRYPT_SALT_ROUND))
    this.password = hashedPassword
    next()
})

export const UserModel = model<TUser>('user', UserSchema)