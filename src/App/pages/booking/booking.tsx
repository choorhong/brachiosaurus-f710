import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Nav from '../../layout/Nav'
import { BookingList, FilterButton } from '../../components/booking'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'
import { weekEnd, weekStart } from '../../utils/dates'

const BookingPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<any[]>([])

  const initialValues = useMemo(() => searchQuery.cutOffStartDate && searchQuery.cutOffEndDate
    ? { ...searchQuery, cutOffStartDate: moment(searchQuery.cutOffStartDate), cutOffEndDate: moment(searchQuery.cutOffEndDate) }
    : { ...searchQuery, cutOffStartDate: weekStart, cutOffEndDate: weekEnd }, [searchQuery])

  useEffect(() => {
    (async () => {
      let url = '/booking'

      if (search) {
        url = `/booking${search}`
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
  }, [search])

  const handleFilterSave = useCallback((values: Record<string, string>) => history.push(`?${stringify(values)}`), [history, stringify])

  return (
    <Nav>
      <SearchBar
        advanceFilter={<FilterButton initialValues={initialValues} onSave={handleFilterSave} />}
        searchProps={{
          defaultValue: searchQuery.bookingId || undefined,
          onSearch: (value: string) => history.push(`?${stringify({ bookingId: value.trim() || undefined })}`),
          placeholder: 'Search by Booking'
        }}
        type='booking'
      />
      <BookingList data={data} />
    </Nav>
  )
}

export default BookingPage
