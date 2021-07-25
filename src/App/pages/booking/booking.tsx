import React from 'react'
import Nav from '../../layout/Nav'
import { BookingList } from '../../components/booking'
import SearchBar from '../../components/_shared/SearchBar'

const BookingPage: React.FC = (props) => {
  return (
    <Nav>
      <SearchBar type='booking' placeholder='Search by Booking' />
      <BookingList />
    </Nav>
  )
}

export default BookingPage
