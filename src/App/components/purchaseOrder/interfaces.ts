export enum STATUS {
  CANCELED = 'CANCELED',
  CREATED = 'CREATED',
  FULFILLED = 'FULFILLED'
}

export interface SubmitValues {
  vendor: string;
  status: string;
  users: string[];
  note?: string;
}
