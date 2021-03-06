import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from '../../layout/Nav'
import { ContactList, FilterButton } from '../../components/contact'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const ContactPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<Record<string, any>>({ rows: [] })
  // what if user type or change the page to 0 or -1 ? Like: /contact?page=0 or /contact?page=-1?
  useEffect(() => {
    (async () => {
      let url = '/contact'

      if (search) {
        url = `/contact${search}`
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
  }, [search])

  const handleFilterSave = useCallback((values: Record<string, string>) => history.push(`?${stringify(values)}`), [history, stringify])
  const handlePaginationChange = useCallback((page: number) => history.push(`?${stringify({ ...searchQuery, page })}`), [history, searchQuery, stringify])

  return (
    <Nav>
      <SearchBar
        type='contact'
        advanceFilter={<FilterButton initialValues={searchQuery} onSave={handleFilterSave} />}
        searchProps={{
          defaultValue: searchQuery.name || undefined,
          onSearch: (value: string) => history.push(`?${stringify({ name: value.trim() || undefined })}`),
          placeholder: 'Search by Contact'
        }}
      />
      <ContactList data={data} current={(searchQuery.page as string) ?? '1'} onPaginationChange={handlePaginationChange} />
    </Nav>
  )
}

export default ContactPage
