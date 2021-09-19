import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Nav from '../../layout/Nav'
import { FilterButton, PurchaseOrderList } from '../../components/purchaseOrder'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'
import { useQuery } from '../../hooks/query-hook'

const PurchaseOrderPage: React.FC = (props) => {
  const history = useHistory()
  const { search, searchQuery, stringify } = useQuery()
  const [data, setData] = useState<Record<string, any>>({ rows: [] })

  useEffect(() => {
    (async () => {
      let url = '/purchase-order'

      if (search) {
        url = `/purchase-order${search}`
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
        type='purchase-order'
        advanceFilter={<FilterButton initialValues={searchQuery} onSave={handleFilterSave} />}
        searchProps={{
          defaultValue: searchQuery.purchaseOrderId || undefined,
          onSearch: (value: string) => history.push(`?${stringify({ purchaseOrderId: value.trim() || undefined })}`),
          placeholder: 'Search by Purchase Order'
        }}
      />
      <PurchaseOrderList data={data} current={(searchQuery.page as string) ?? '1'} />
    </Nav>
  )
}

export default PurchaseOrderPage
