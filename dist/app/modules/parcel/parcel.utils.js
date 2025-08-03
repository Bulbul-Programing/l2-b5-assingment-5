"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_ACTIONS = exports.STATUS_FLOW = void 0;
exports.STATUS_FLOW = {
    'requested': ['approved', 'cancelled', 'blocked'],
    'approved': ['dispatched', 'cancelled', 'blocked'],
    'dispatched': ['in-transit', 'cancelled', 'blocked'],
    'in-transit': ['delivered', 'blocked', 'returned'],
    'delivered': ['returned'],
    'cancelled': [],
    'blocked': [],
    'returned': ['rescheduled'],
    'rescheduled': ['dispatched']
};
exports.ROLE_ACTIONS = {
    admin: ['approved', 'dispatched', 'in-transit', 'blocked', 'cancelled'],
    sender: ['cancelled'],
    receiver: ['delivered', 'returned', 'rescheduled']
};
