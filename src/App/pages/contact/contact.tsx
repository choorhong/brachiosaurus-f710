import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { ContactList } from '../../components/contact'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'

const ContactPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const contacts = await axiosAuth.get('/contact')
        if (contacts && contacts.data) {
          setData(contacts.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <SearchBar type='contact' placeholder='Search by Contact' />
      <ContactList data={data} />
    </Nav>
  )
}

export default ContactPage
