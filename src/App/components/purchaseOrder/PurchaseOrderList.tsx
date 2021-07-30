import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Popconfirm, Table, Tag } from 'antd'

import { STATUS, SubmitValues } from '../types/purchaseOrder'
import PurchaseOrderForm from './PurchaseOrderForm'

const PurchaseOrderList: React.FC<{data: any[]}> = ({ data }) => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Purchase Order',
      dataIndex: 'purchaseOrderId',
      key: 'purchaseOrderId',
      render: (text: string, data: Record<any, any>) => <Link to={`/purchase-order/${data.id}`}>{text}</Link>
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (vendor: Record<any, any>) => vendor.name
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color = 'volcano'
        if (status === STATUS.CREATED) {
          color = 'orange'
        } else if (status === STATUS.FULFILLED) {
          color = 'green'
        } else if (status === STATUS.CANCELED) {
          color = 'red'
        }

        return <Tag color={color}>{status}</Tag>
      }
    }
    // {
    //   title: 'Users',
    //   dataIndex: 'users',
    //   key: 'users',
    //   render: (users: string[]) => users.join(', ')
    // },
    // {
    //   title: 'Note/Remarks',
    //   dataIndex: 'remarks',
    //   key: 'remarks'
    // },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_: any, record: SubmitValues) => {
    //     return (
    //       <>
    //         <Button onClick={() => setValues(record)} type='link' style={{ marginRight: 8, padding: 0 }}>
    //           Edit
    //         </Button>
    //         <Popconfirm title={`Are you sure you want to delete ${record.purchaseOrderId}?`} onConfirm={() => console.log('delete', record.purchaseOrderId)}>
    //           <Button type='link' style={{ padding: 0 }}>
    //             Delete
    //           </Button>
    //         </Popconfirm>
    //       </>
    //     )
    //   }
    // }
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
