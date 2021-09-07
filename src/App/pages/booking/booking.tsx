import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from '../../layout/Nav'
import { BookingList, FilterButton } from '../../components/booking'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const BookingPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      let url = '/booking'
      if (searchQuery.bookingId) {
        url = `/booking/search${search}`
      } else if (searchQuery.forwarder || searchQuery.cutOffStartDate || searchQuery.cutOffEndDate || searchQuery.departureLocation || searchQuery.arrivalLocation) {
        url = `/booking/find${search}`
      }
      try {
        const { data } = await axiosAuth.get(url)
        if (data) {
          setData(data)
          return
        }
        throw new Error()
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [search, searchQuery.arrivalLocation, searchQuery.bookingId, searchQuery.cutOffEndDate, searchQuery.cutOffStartDate, searchQuery.departureLocation, searchQuery.forwarder])

  const handleFilterSave = useCallback((values: Record<string, string>) => history.push(`?${stringify(values)}`), [history, stringify])

  return (
    <Nav>
      <SearchBar
        advanceFilter={<FilterButton onSave={handleFilterSave} />}
        SearchProps={{
          defaultValue: searchQuery.bookingId as string ?? '',
          onSearch: (value: string) => history.push(`?bookingId=${value}`),
          placeholder: 'Search by Booking'
        }}
        type='booking'
      />
      <BookingList data={data} />
    </Nav>
  )
}

export default BookingPage
