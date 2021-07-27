export enum STATUS {
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED'
}

export interface SubmitValues {
  po: string;
  vendor: string;
  status: string;
  users: string[];
  note?: string;
}

export interface IPurchaseOrderFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
