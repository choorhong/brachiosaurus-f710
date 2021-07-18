import React from 'react'
import Nav from '../layout/Nav'
import { ContactForm } from '../components/contact'

const ContactFormPage: React.FC = (props) => {
  return (
    <Nav>
      <ContactForm />
    </Nav>
  )
}

export default ContactFormPage
