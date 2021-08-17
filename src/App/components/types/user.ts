export enum ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  EXECUTIVE = 'EXECUTIVE'
}

export enum STATUS {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export interface SubmitValues {
  id: string;
  role: string;
  status: string;
}
