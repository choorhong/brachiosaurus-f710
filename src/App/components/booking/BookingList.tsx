import React, { useState, useMemo } from 'react'
import { Button, Modal, Tag, Table } from 'antd'
import moment from 'moment'

import BookingForm from './BookingForm'
import { SubmitValues } from '../types/booking'
import { VesselForm } from '../vessel'
import { Link } from 'react-router-dom'

const BookingList: React.FC<{data: any[]}> = ({ data }) => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
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
    // {
    //   title: 'Arrival',
    //   children: [
    //     {
    //       title: 'ETA',
    //       key: 'eta',
    //       dataIndex: ['arrival', 'date'],
    //       render: (time: moment.Moment) => time.format('YYYY-MM-DD HH:mm').toString()
    //     },
    //     {
    //       title: 'Location',
    //       key: 'location',
    //       dataIndex: ['arrival', 'location']
    //     }
    //   ]
    // },
    // {
    //   title: 'Vessel',
    //   dataIndex: 'vessel',
    //   key: 'vessel',
    //   render: (vessel: Record<any, any>) => vessel.name

    // },
    {
      title: 'ERD / Cut off',
      key: 'dates',
      // dataIndex: 'vessel',
      render: (booking: any) =>
        (
          <>
            <Tag color='cyan'>
              <Link to='/booking'>{booking.vessel.name}</Link>
            </Tag>

            <Tag color='green'>
              {moment(booking.vessel.earliestReturningDate).format('YYYY-MM-DD')}
            </Tag>
            <Tag color='red'>
              {moment(booking.vessel.cutOff).format('YYYY-MM-DD')}
            </Tag>
          </>
        )
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
    //         <Popconfirm title={`Are you sure you want to delete ${record.booking}?`} onConfirm={() => console.log('delete', record.booking)}>
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
      <Table columns={columns} dataSource={data} bordered />
      {values && (
        <Modal
          footer={[
            <Button key='cancel' onClick={() => setValues(null)}>
              Cancel
            </Button>,
            <Button key='save' type='primary' form='booking-form' htmlType='submit'>
              Save
            </Button>
          ]}
          onCancel={() => setValues(null)}
          title='Edit Booking'
          visible
        >
          <BookingForm initialValues={values} onSave={handleSave} />
        </Modal>
      )}
    </>
  )
}

export default BookingList
