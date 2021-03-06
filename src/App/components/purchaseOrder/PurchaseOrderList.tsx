import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag } from 'antd'

import { STATUS } from '../types/purchaseOrder'
import { IListProps } from '../types/shared'

const PurchaseOrderList: React.FC<IListProps> = ({ data, current, onPaginationChange }) => {
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
      render: (vendor: Record<any, any>) => vendor?.name
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
  ], [])

  return (
    <Table
      columns={columns}
      dataSource={data.rows}
      rowKey={(data) => data.id}
      pagination={{
        current: +current,
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: data.count,
        simple: true,
        onChange: onPaginationChange
      }}
    />
  )
}

export default PurchaseOrderList
