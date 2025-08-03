import { Types } from "mongoose";


export type TCoupon = {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    createdBy: Types.ObjectId;
    isActive?: boolean;
}
