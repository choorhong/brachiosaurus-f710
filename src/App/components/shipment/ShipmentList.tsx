import React, { useMemo } from 'react'
import { Table, Tag } from 'antd'

import { STATUS } from '../types/shipment'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import { data } from '../../mock/shipment'

const ShipmentList: React.FC<{data: any[]}> = ({ data }) => {
  const columns = useMemo(() => [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Link to={`/shipment/${id}`}>{id.slice(-5)}</Link>
    },
    {
      title: 'Purchase Order',
      dataIndex: 'purchaseOrder',
      key: 'po',
      render: (data: Record<any, any>) => <Link to={`/purchase-order/${data.id}`} target='_blank'>{data.purchaseOrderId}</Link>
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (data: Record<any, any>) => <Link to={`/contact/${data.id}`} target='_blank'>{data.name}</Link>

    },
    {
      title: 'Booking',
      key: 'booking',
      width: '35%',
      render: (data: Record<any, any>) => (
        <>
          <Tag color='purple'>
            <Link to={`/booking/${data.booking.id}`} target='_blank'>{data.booking.bookingId}</Link>
          </Tag>
          <Tag color='cyan'>
            <Link to={`/vessel/${data.booking.vessel.id}`} target='_blank'>{data.booking.vessel.name}</Link>
          </Tag>
          <Tag color='green'>
            {moment(data.booking.vessel.earliestReturningDate).format('YYYY-MM-DD')}
          </Tag>
          <Tag color='red'>
            {moment(data.booking.vessel.cutoff).format('YYYY-MM-DD')}
          </Tag>
        </>
      )
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
    //         <Popconfirm title='Are you sure you want to delete this record?' onConfirm={() => console.log('deleted')}>
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
  // const handleSave = (values: SubmitValues) => {
  //   console.log(values)
  //   setValues(null)
  // }

  return <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
}

export default ShipmentList
