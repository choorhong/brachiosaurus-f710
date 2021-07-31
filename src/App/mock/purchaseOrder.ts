import { STATUS } from '../components/types/purchaseOrder'

export const dummyData = [
  {
    key: '1',
    purchaseOrderId: 'PO 1',
    vendor: { name: 'Vendor 1' },
    vendorId: 'VendorID 1',
    status: STATUS.CREATED,
    users: ['user1'],
    remarks: 'Note 1'
  },
  {
    key: '2',
    purchaseOrderId: 'PO 2',
    vendor: { name: 'Vendor 2' },
    vendorId: 'VendorID 2',
    status: STATUS.FULFILLED,
    users: ['user1', 'user2'],
    remarks: 'Note 2'
  },
  {
    key: '3',
    purchaseOrderId: 'PO 3',
    vendor: { name: 'Vendor 3' },
    vendorId: 'VendorID 3',
    status: STATUS.CANCELED,
    users: ['user2', 'user3'],
    remarks: 'Note 3'
  }
]
