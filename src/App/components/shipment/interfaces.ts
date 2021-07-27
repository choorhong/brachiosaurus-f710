export enum STATUS {
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED',
  PAID = 'PAID',
  SCHEDULED = 'SCHEDULED',
  SHIPPED = 'SHIPPED'
}

export interface SubmitValues {
  po: string;
  vendor: string;
  booking: string;
  status: string;
  users: string[];
  note?: string;
}

export interface IShipmentFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
