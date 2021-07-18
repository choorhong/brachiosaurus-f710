import React from 'react'
import Nav from '../layout/Nav'
import { BookingForm } from '../components/booking'

const BookingFormPage: React.FC = (props) => {
  return (
    <Nav>
      <BookingForm />
    </Nav>
  )
}

export default BookingFormPage
