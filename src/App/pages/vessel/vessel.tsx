import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Nav from '../../layout/Nav'
import SearchBar from '../../components/_shared/SearchBar'
import { VesselList, FilterButton } from '../../components/vessel'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'
import { weekEnd, weekStart } from '../../utils/dates'

const VesselPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<Record<string, any>>({ rows: [] })
  const { cutOffStartDate, cutOffEndDate, name } = searchQuery

  const initialValues = useMemo(() => cutOffStartDate && cutOffEndDate
    ? { cutOffStartDate: moment(cutOffStartDate), cutOffEndDate: moment(cutOffEndDate) }
    : { cutOffStartDate: weekStart, cutOffEndDate: weekEnd }, [cutOffEndDate, cutOffStartDate])

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
  const handlePaginationChange = useCallback((page: number) => history.push(`?${stringify({ ...searchQuery, page })}`), [history, searchQuery, stringify])

  return (
    <Nav>
      <SearchBar
        type='vessel'
        advanceFilter={<FilterButton initialValues={initialValues} onSave={handleFilterSave} />}
        searchProps={{
          defaultValue: name || undefined,
          onSearch: (value: string) => history.push(`?${stringify({ name: value.trim() || undefined })}`),
          placeholder: 'Search by Vessel'
        }}
      />
      <VesselList data={data} current={(searchQuery.page as string) ?? '1'} onPaginationChange={handlePaginationChange} />
    </Nav>
  )
}

export default VesselPage
