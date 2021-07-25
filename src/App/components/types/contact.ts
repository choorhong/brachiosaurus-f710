export enum ROLE {
  FORWARDER = 'FORWARDER',
  LOGISTICS = 'LOGISTICS',
  PURCHASER = 'PURCHASER',
  VENDOR = 'VENDOR'
}

export interface SubmitValues {
  name: string;
  role: ROLE;
  note?: string;
}
