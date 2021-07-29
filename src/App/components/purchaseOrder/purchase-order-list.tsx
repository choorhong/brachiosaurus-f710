import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { STATUS } from '../types/purchaseOrder'

const columns = [
  {
    title: 'Purchase Order',
    dataIndex: 'purchaseOrderId',
    key: 'purchaseOrderId',
    render: (text: string) => <Link to='/purchase-order'>{text}</Link>
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
      }

      if (status === 'FULFILLED') {
        color = 'green'
      }

      if (status === STATUS.CANCELED) {
        color = 'red'
      }

      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  }
]

const PurchaseOrderList: React.FC<{data: any[]}> = (props) => {
  const { data } = props
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default PurchaseOrderList
