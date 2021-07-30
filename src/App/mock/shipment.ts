import { STATUS } from '../components/types/shipment'

export const data = [
  {
    key: '1',
    po: 'Purchase Order 1',
    vendor: 'Vendor 1',
    booking: 'Booking 1',
    status: STATUS.CREATED,
    users: ['user1'],
    remarks: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    po: 'Purchase Order 2',
    vendor: 'Vendor 2',
    booking: 'Booking 2',
    status: STATUS.FULFILLED,
    users: ['user2'],
    remarks: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    po: 'Purchase Order 3',
    vendor: 'Vendor 3',
    booking: 'Booking 3',
    status: STATUS.PAID,
    users: ['user2', 'user3'],
    remarks: 'Sidney No. 1 Lake Park'
  }
]
