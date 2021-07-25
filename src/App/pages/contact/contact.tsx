import React from 'react'
import Nav from '../../layout/Nav'
import { ContactList } from '../../components/contact'
import SearchBar from '../../components/_shared/SearchBar'

const ContactPage: React.FC = (props) => {
  return (
    <Nav>
      <SearchBar type='contact' placeholder='Search by Contact' />
      <ContactList />
    </Nav>
  )
}

export default ContactPage
