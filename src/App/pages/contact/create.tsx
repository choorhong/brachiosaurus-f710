import React from 'react'
import Nav from '../../layout/Nav'
import { ContactForm } from '../../components/contact'

const CreateContactPage: React.FC = (props) => {
  return (
    <Nav>
      <ContactForm />
    </Nav>
  )
}

export default CreateContactPage
