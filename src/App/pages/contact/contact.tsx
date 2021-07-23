import React from 'react'
import Nav from '../../layout/Nav'
import { ContactList } from '../../components/contact'

const ContactPage: React.FC = (props) => {
  return (
    <Nav>
      <ContactList />
    </Nav>
  )
}

export default ContactPage
