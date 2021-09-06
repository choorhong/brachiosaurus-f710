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
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      let url = '/purchase-order'
      if (searchQuery.purchaseOrderId) {
        url = `/purchase-order/search${search}`
      } else if (searchQuery.vendor || searchQuery.status) {
        url = `/purchase-order/find${search}`
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
  }, [search, searchQuery.purchaseOrderId, searchQuery.status, searchQuery.vendor])

  const handleFilterSave = useCallback((values: Record<string, string>) => history.push(`?${stringify(values)}`), [history, stringify])

  return (
    <Nav>
      <SearchBar
        advanceFilter={<FilterButton onSave={handleFilterSave} />}
        SearchProps={{
          defaultValue: searchQuery.purchaseOrderId as string ?? '',
          onSearch: (value: string) => history.push(`?purchaseOrderId=${value}`),
          placeholder: 'Search by Purchase Order'
        }}
        type='purchase-order'
      />
      <PurchaseOrderList data={data} />
    </Nav>
  )
}

export default PurchaseOrderPage
