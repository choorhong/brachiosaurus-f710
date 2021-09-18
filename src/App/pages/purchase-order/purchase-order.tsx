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
        advanceFilter={<FilterButton initialValues={searchQuery} onSave={handleFilterSave} />}
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
