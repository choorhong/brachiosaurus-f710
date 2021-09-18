import { STATUS } from '../types/shipment'

export const STATUS_OPTIONS = [
  { label: 'Created', value: STATUS.CREATED },
  { label: 'Scheduled', value: STATUS.SCHEDULED },
  { label: 'Shipped', value: STATUS.SHIPPED },
  { label: 'Fulfilled', value: STATUS.FULFILLED },
  { label: 'Paid', value: STATUS.PAID },
  { label: 'Canceled', value: STATUS.CANCELED }
]
