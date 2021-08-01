import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { BookingList } from '../../components/booking'
import SearchBar from '../../components/_shared/SearchBar'
import axios from 'axios'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const BookingPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const bookings = await axios.get(`${baseUrl}/booking`)
        if (bookings && bookings.data) {
          setData(bookings.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <SearchBar type='booking' placeholder='Search by Booking' />
      <BookingList data={data} />
    </Nav>
  )
}

export default BookingPage
