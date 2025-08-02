import { ParcelStatus } from "./parcel.interface";

export const STATUS_FLOW: Record<ParcelStatus, ParcelStatus[]> = {
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

export const ROLE_ACTIONS: Record<string, ParcelStatus[]> = {
  admin: ['approved', 'dispatched', 'in-transit', 'blocked', 'cancelled'],
  sender: ['cancelled'],
  receiver: ['delivered', 'returned', 'rescheduled']
};