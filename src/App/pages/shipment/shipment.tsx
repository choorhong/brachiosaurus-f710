import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from '../../layout/Nav'
import { FilterButton, ShipmentList } from '../../components/shipment'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const ShipmentPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      let url = '/shipment'

      if (search) {
        url = `/shipment${search}`
      }

      try {
        const { data } = await axiosAuth.get(url)
        if (data) {
          setData(data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [search])

  const handleFilterSave = useCallback((values: Record<string, string>) => history.push(`?${stringify(values)}`), [history, stringify])

  return (
    <Nav>
      <SearchBar
        advanceFilter={<FilterButton initialValues={searchQuery} onSave={handleFilterSave} />}
        SearchProps={{
          defaultValue: searchQuery.bookingId as string ?? '',
          onSearch: (value: string) => history.push(`?bookingId=${value}`),
          placeholder: 'Search by Booking or Purchase Order'
        }}
        type='shipment'
      />
      <ShipmentList data={data} />
    </Nav>
  )
}

export default ShipmentPage
