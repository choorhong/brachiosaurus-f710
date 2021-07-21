import React from 'react'
import Nav from '../layout/Nav'
import { BookingList } from '../components/booking'

const BookingPage: React.FC = (props) => {
  return (
    <Nav>
      <BookingList />
    </Nav>
  )
}

export default BookingPage
