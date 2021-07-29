export enum ROLE {
  FORWARDER = 'FORWARDER',
  LOGISTICS = 'LOGISTICS',
  PURCHASER = 'PURCHASER',
  VENDOR = 'VENDOR'
}

export interface SubmitValues {
  name: string;
  role: ROLE;
  remarks?: string;
}

export interface IContactFormProps {
  initialValues?: SubmitValues;
  onSave?: (values: any) => void;
}
