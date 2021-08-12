export enum STATUS {
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED',
  PAID = 'PAID',
  SCHEDULED = 'SCHEDULED',
  SHIPPED = 'SHIPPED'
}

export interface SubmitValues {
  id?: string;
  purchaseOrderId: string;
  vendorId: string;
  bookingId?: string;
  status: string;
  users?: string[];
  remarks?: string;
}

export interface ShipmentValues extends SubmitValues {
  purchaseOrder?: Record<string, any>;
  vendor?: Record<string, any>;
  booking?: Record<string, any>;
}
