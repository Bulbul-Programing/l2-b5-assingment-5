import { model, Schema } from "mongoose";
import { Role, TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import { envVars } from "../../config/env";

const UserSchema: Schema<TUser> = new Schema<TUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, require: true },
        address: { type: String, required: true },
        phone: {
            type: String,
            unique : true,
            required: true,
            validate: {
                validator: function (number) {
                    return /^(?:\+8801[3-9]\d{8}|8801[3-9]\d{8}|01[3-9]\d{8})$/.test(number);
                },
                message: props => `${props.value} is not a valid Bangladeshi phone number!`
            }
        },
        role: { type: String, enum: Object.values(Role), default: Role.sender },
        isBlocked: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    if (this.phone.startsWith('01')) {
        this.phone = '+880' + this.phone.slice(1);
    } else if (this.phone.startsWith('880')) {
        this.phone = '+' + this.phone;
    }
    const hashedPassword = await bcrypt.hash(this.password, Number(envVars.BCRYPT_SALT_ROUND))
    this.password = hashedPassword
    next()
})

export const UserModel = model<TUser>('user', UserSchema)