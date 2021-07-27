import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table, Tag } from 'antd'

import ShipmentForm from './ShipmentForm'
import { STATUS, SubmitValues } from './interfaces'

const data = [
  {
    key: '1',
    po: 'Purchase Order 1',
    vendor: 'Vendor 1',
    booking: 'Booking 1',
    status: STATUS.CREATED,
    users: ['user1'],
    note: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    po: 'Purchase Order 2',
    vendor: 'Vendor 2',
    booking: 'Booking 2',
    status: STATUS.FULFILLED,
    users: ['user2'],
    note: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    po: 'Purchase Order 3',
    vendor: 'Vendor 3',
    booking: 'Booking 3',
    status: STATUS.PAID,
    users: ['user2', 'user3'],
    note: 'Sidney No. 1 Lake Park'
  }
]

const ShipmentList: React.FC = () => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Purchase Order',
      dataIndex: 'po',
      key: 'po'
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor'
    },
    {
      title: 'Booking',
      dataIndex: 'booking',
      key: 'booking'
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
        } else if (status === STATUS.CANCELED) {
          color = 'volcano'
        } else if (status === STATUS.PAID) {
          color = 'purple'
        } else if (status === STATUS.SCHEDULED) {
          color = 'yellow'
        } else {
          color = 'pink'
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
      title: 'Note/Remarks',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SubmitValues) => {
        return (
          <>
            <Button onClick={() => setValues(record)} type='link' style={{ marginRight: 8, padding: 0 }}>
              Edit
            </Button>
            <Popconfirm title='Are you sure you want to delete this record?' onConfirm={() => console.log('deleted')}>
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
            <Button key='save' type='primary' form='shipment-form' htmlType='submit'>
              Save
            </Button>
          ]}
          onCancel={() => setValues(null)}
          title='Edit Shipment'
          visible
        >
          <ShipmentForm initialValues={values} onSave={handleSave} />
        </Modal>
      )}
    </>
  )
}

export default ShipmentList
