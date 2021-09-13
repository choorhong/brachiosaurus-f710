import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from '../../layout/Nav'
import SearchBar from '../../components/_shared/SearchBar'
import { VesselList, FilterButton } from '../../components/vessel'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const VesselPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      let url = '/vessel'

      if (search) {
        url = `/vessel${search}`
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
        advanceFilter={<FilterButton onSave={handleFilterSave} />}
        SearchProps={{
          defaultValue: searchQuery.name as string ?? '',
          onSearch: (value: string) => history.push(`?name=${value}`),
          placeholder: 'Search by Vessel'
        }}
        type='vessel'
      />
      <VesselList data={data} />
    </Nav>
  )
}

export default VesselPage
