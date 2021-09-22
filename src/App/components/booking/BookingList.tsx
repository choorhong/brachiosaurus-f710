import React, { useMemo } from 'react'
import { Tag, Table } from 'antd'
import moment from 'moment'

import { Link } from 'react-router-dom'

const BookingList: React.FC<{ data: any[] }> = ({ data }) => {
  const columns = useMemo(() => [
    {
      title: 'Booking',
      dataIndex: 'bookingId',
      key: 'booking',
      render: (text: string, data: Record<any, any>) => <Link to={`/booking/${data.id}`}>{text}</Link>
    },
    {
      title: 'Forwarder',
      dataIndex: 'forwarder',
      key: 'forwarder',
      render: (forwarder: Record<any, any>) => forwarder.name
    },
    {
      title: 'Dates/Locations',
      children: [
        {
          title: 'Departure',
          key: 'departure',
          dataIndex: 'departure',
          render: (departure: Record<any, any>) => (
            <>
              <Tag color='geekblue'>
                {moment(departure.date).format('YYYY-MM-DD')}
              </Tag>
              <Tag color='volcano'>
                {departure.location}
              </Tag>
            </>
          )
        },
        {
          title: 'Arrival',
          key: 'arrival',
          dataIndex: 'arrival',
          render: (arrival: Record<any, any>) => (
            <>
              <Tag color='geekblue'>
                {moment(arrival.date).format('YYYY-MM-DD')}
              </Tag>
              <Tag color='volcano'>
                {arrival.location}
              </Tag>
            </>
          )

        }
      ]
    },
    {
      title: 'ERD / Cut off',
      key: 'vessel',
      dataIndex: 'vessel',
      render: (vessel: any) =>
        (
          <>
            <Tag color='cyan'>
              <Link to='/booking'>{vessel.name}</Link>
            </Tag>

            <Tag color='green'>
              {moment(vessel.earliestReturningDate).format('YYYY-MM-DD')}
            </Tag>
            <Tag color='red'>
              {moment(vessel.cutOff).format('YYYY-MM-DD')}
            </Tag>
          </>
        )
    }
  ], [])

  return <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
}

export default BookingList
