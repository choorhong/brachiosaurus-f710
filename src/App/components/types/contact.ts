export enum ROLE {
  FORWARDER = 'FORWARDER',
  LOGISTICS = 'LOGISTICS',
  PURCHASER = 'PURCHASER',
  VENDOR = 'VENDOR'
}

export interface SubmitValues {
  id?: string;
  name: string;
  role: ROLE;
  remarks?: string;
}
