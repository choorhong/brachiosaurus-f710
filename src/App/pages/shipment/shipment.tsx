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
  const [data, setData] = useState<Record<string, any>>({ rows: [] })

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
  const handlePaginationChange = useCallback((page: number) => history.push(`?${stringify({ ...searchQuery, page })}`), [history, searchQuery, stringify])

  return (
    <Nav>
      <SearchBar
        type='shipment'
        advanceFilter={<FilterButton initialValues={searchQuery} onSave={handleFilterSave} />}
        searchProps={{
          defaultValue: searchQuery.container || undefined,
          onSearch: (value: string) => history.push(`?${stringify({ container: value.trim() || undefined })}`),
          placeholder: 'Search by Container No.'
        }}
      />
      <ShipmentList data={data} current={(searchQuery.page as string) ?? '1'} onPaginationChange={handlePaginationChange} />
    </Nav>
  )
}

export default ShipmentPage
