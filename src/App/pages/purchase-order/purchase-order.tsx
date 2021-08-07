import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { PurchaseOrderList } from '../../components/purchaseOrder'
import SearchBar from '../../components/_shared/SearchBar'
import axiosAuth from '../../axios'

const PurchaseOrderPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const purchaseOrder = await axiosAuth.get('/purchase-order')
        if (purchaseOrder && purchaseOrder.data) {
          setData(purchaseOrder.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <SearchBar type='purchase-order' placeholder='Search by Purchase Order' />
      <PurchaseOrderList data={data} />
    </Nav>
  )
}

export default PurchaseOrderPage
