import { ParcelStatus } from "./parcel.interface";

export const STATUS_FLOW: Record<ParcelStatus, ParcelStatus[]> = {
  Requested: ['Approved', 'Cancelled'],
  Approved: ['Dispatched', 'Cancelled'],
  Dispatched: ['In Transit', 'Cancelled'],
  'In Transit': ['Delivered', 'Blocked'],
  Delivered: [],
  Cancelled: [],
  Blocked: []
};
