import moment from 'moment'

export const data = [
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
