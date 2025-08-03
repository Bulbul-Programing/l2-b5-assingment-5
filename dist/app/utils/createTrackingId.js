"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackingId = void 0;
const createTrackingId = () => {
    const dateString = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return `TRK-${dateString}-${randomNumber}`;
};
exports.createTrackingId = createTrackingId;
