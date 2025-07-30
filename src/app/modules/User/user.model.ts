import { model, Schema } from "mongoose";
import { Role, TUser } from "./user.interface";


const UserSchema: Schema<TUser> = new Schema<TUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, require: true },
        phone: { type: String },
        role: { type: String, enum: Object.values(Role), default: Role.SENDER },
        isBlocked: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model<TUser>('user', UserSchema)