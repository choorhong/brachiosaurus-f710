import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table } from 'antd'
import moment from 'moment'

import BookingForm from './BookingForm'
import { SubmitValues } from '../types/booking'

const data = [
  {
    key: '1',
    booking: 'Booking 1',
    forwarder: 'forwarder1',
    departure: {
      date: moment('2013-02-08 09:30'),
      location: 'US'
    },
    arrival: {
      date: moment('2014-02-08 09:30'),
      location: 'France'
    },
    vessel: 'Vessel 1',
    users: ['user1'],
    remarks: 'Note 1'
  },
  {
    key: '2',
    booking: 'Booking 2',
    forwarder: 'forwarder2',
    departure: {
      date: moment('2015-02-08 09:30'),
      location: 'Spain'
    },
    arrival: {
      date: moment('2016-02-08 09:30'),
      location: 'England'
    },
    vessel: 'Vessel 2',
    users: ['user2'],
    remarks: 'Note 2'
  },
  {
    key: '3',
    booking: 'Booking 3',
    forwarder: 'forwarder3',
    departure: {
      date: moment('2017-02-08 09:30'),
      location: 'Italy'
    },
    arrival: {
      date: moment('2018-02-08 09:30'),
      location: 'Portugal'
    },
    vessel: 'Vessel 3',
    users: ['user2', 'user3'],
    remarks: 'Note 3'
  }
]

const BookingList: React.FC = () => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Booking',
      dataIndex: 'booking',
      key: 'booking'
    },
    {
      title: 'Forwarder',
      dataIndex: 'forwarder',
      key: 'forwarder'
    },
    {
      title: 'Departure',
      children: [
        {
          title: 'ETD',
          key: 'etd',
          dataIndex: ['departure', 'date'],
          render: (time: moment.Moment) => time.format('YYYY-MM-DD HH:mm').toString()
        },
        {
          title: 'Location',
          key: 'location',
          dataIndex: ['departure', 'location']
        }
      ]
    },
    {
      title: 'Arrival',
      children: [
        {
          title: 'ETA',
          key: 'eta',
          dataIndex: ['arrival', 'date'],
          render: (time: moment.Moment) => time.format('YYYY-MM-DD HH:mm').toString()
        },
        {
          title: 'Location',
          key: 'location',
          dataIndex: ['arrival', 'location']
        }
      ]
    },
    {
      title: 'Vessel',
      dataIndex: 'vessel',
      key: 'vessel'
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
      <Table columns={columns} dataSource={data} />
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
