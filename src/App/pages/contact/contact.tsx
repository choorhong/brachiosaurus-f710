import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { ContactList } from '../../components/contact'
import SearchBar from '../../components/_shared/SearchBar'
import axios from 'axios'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ContactPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const contacts = await axios.get(`${baseUrl}/contact`)
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
