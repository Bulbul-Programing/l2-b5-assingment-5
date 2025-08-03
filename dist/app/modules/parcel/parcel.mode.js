"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const createTrackingId_1 = require("../../utils/createTrackingId");
const ParcelStatusEnum = [
    'requested',
    'approved',
    'dispatched',
    'in-transit',
    'delivered',
    'cancelled',
    'blocked',
    'returned',
    'rescheduled'
];
const ParcelStatusLogSchema = new mongoose_1.Schema({
    status: { type: String, enum: ParcelStatusEnum, required: true },
    location: { type: String },
    note: { type: String },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    returnReason: { type: String },
    rescheduledDate: { type: Date }
}, { _id: false, timestamps: true });
const ParcelSchema = new mongoose_1.Schema({
    trackingId: { type: String, unique: true },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    senderAddress: { type: String },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    receiverAddress: { type: String },
    weight: { type: Number, required: true },
    deliveryFee: { type: Number },
    coupon: { type: String, required: false },
    status: { type: String, enum: ParcelStatusEnum, default: 'requested' },
    isBlocked: { type: Boolean, default: false },
    statusLog: { type: [ParcelStatusLogSchema] },
}, { timestamps: true });
ParcelSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.trackingId) {
            this.trackingId = (0, createTrackingId_1.createTrackingId)();
        }
        next();
    });
});
exports.ParcelModel = mongoose_1.default.model('Parcel', ParcelSchema);
