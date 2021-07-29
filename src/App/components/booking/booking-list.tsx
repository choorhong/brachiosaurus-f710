import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

const columns = [
  {
    title: 'Booking',
    dataIndex: 'bookingId',
    key: 'booking',
    render: (text: string) => <Link to='/booking'>{text}</Link>
  },
  {
    title: 'Forwarder',
    dataIndex: 'forwarder',
    key: 'forwarder',
    render: (forwarder: any) => <Link to='/booking'>{forwarder.name}</Link>

  },
  {
    title: 'ERD / Cut off',
    key: 'dates',
    // dataIndex: 'vessel',
    render: (booking: any) =>
      (
        <>
          <Tag color='green'>
            {moment(booking.vessel.earliestReturningDate).format('YYYY-MM-DD')}
          </Tag>
          <Tag color='red'>
            {moment(booking.vessel.cutOff).format('YYYY-MM-DD')}
          </Tag>
        </>

      )
  },
  {
    title: 'Vessel',
    dataIndex: 'vessel',
    key: 'vessel',
    render: (vessel: any) => <Link to='/booking'>{vessel.name}</Link>

  }
]

const BookingList: React.FC<{data: any[]}> = (props) => {
  const { data } = props
  return (
    <Table columns={columns} dataSource={data} rowKey={(booking) => booking.id} />
  )
}

export default BookingList
