import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { ContactList } from '../../components/contact'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const ContactPage: React.FC = (props) => {
  const [data, setData] = useState<Record<string, any>>({ rows: [] })
  const { searchQuery } = useQuery()
  // what if user type or change the page to 0 or -1 ? Like: /contact?page=0 or /contact?page=-1?
  useEffect(() => {
    (async () => {
      let url = '/contact'
      if (searchQuery.page) {
        url = `/contact?page=${searchQuery.page}`
      }
      try {
        const contacts = await axiosAuth.get(url)
        if (contacts && contacts.data) {
          setData(contacts.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [searchQuery.page])

  return (
    <Nav>
      <SearchBar type='contact' placeholder='Search by Contact' />
      <ContactList data={data} current={(searchQuery.page as string) ?? '1'} />
    </Nav>
  )
}

export default ContactPage
