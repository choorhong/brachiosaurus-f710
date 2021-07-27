import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table, Tag } from 'antd'

import PurchaseOrderForm from './PurchaseOrderForm'
import { STATUS, SubmitValues } from './interfaces'

const data = [
  {
    key: '1',
    po: 'PO 1',
    vendor: 'Vendor 1',
    status: STATUS.CREATED,
    users: ['user1'],
    note: 'Note 1'
  },
  {
    key: '2',
    po: 'PO 2',
    vendor: 'Vendor 2',
    status: STATUS.FULFILLED,
    users: ['user1', 'user2'],
    note: 'Note 2'
  },
  {
    key: '3',
    po: 'PO 3',
    vendor: 'Vendor 3',
    status: STATUS.CANCELED,
    users: ['user2', 'user3'],
    note: 'Note 3'
  }
]

const PurchaseOrderList: React.FC = () => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'PO',
      dataIndex: 'po',
      key: 'po'
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color: string
        if (status === STATUS.CREATED) {
          color = 'geekblue'
        } else if (status === STATUS.FULFILLED) {
          color = 'green'
        } else {
          color = 'volcano'
        }

        return <Tag color={color}>{status}</Tag>
      }
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      render: (users: string[]) => users.join(', ')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: SubmitValues) => {
        return (
          <>
            <Button onClick={() => setValues(record)} type='link' style={{ marginRight: 8, padding: 0 }}>
              Edit
            </Button>
            <Popconfirm title={`Are you sure you want to delete ${record.po}?`} onConfirm={() => console.log('delete', record.po)}>
              <Button type='link' style={{ padding: 0 }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )
      }
    }
  ], [])

  // TODO: Handle save
  const handleSave = (values: SubmitValues) => {
    console.log(values)
    setValues(null)
  }

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {values && (
        <Modal
          footer={[
            <Button key='cancel' onClick={() => setValues(null)}>
              Cancel
            </Button>,
            <Button key='save' type='primary' form='purchase-order-form' htmlType='submit'>
              Save
            </Button>
          ]}
          onCancel={() => setValues(null)}
          title='Edit Purchase Order'
          visible
        >
          <PurchaseOrderForm initialValues={values} onSave={handleSave} />
        </Modal>
      )}
    </>
  )
}

export default PurchaseOrderList
