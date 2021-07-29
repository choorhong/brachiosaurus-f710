export enum STATUS {
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED'
}

export interface SubmitValues {
  purchaseOrderId: string;
  vendorId: string;
  status: string;
  users: string[];
  remarks?: string;
}

export interface IPurchaseOrderFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
