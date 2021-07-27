import React from 'react'
import Nav from '../../layout/Nav'
import { PurchaseOrderList } from '../../components/purchaseOrder'
import SearchBar from '../../components/_shared/SearchBar'

const PurchaseOrderPage: React.FC = (props) => {
  return (
    <Nav>
      <SearchBar type='purchase-order' placeholder='Search by Purchase Order' />
      <PurchaseOrderList />
    </Nav>
  )
}

export default PurchaseOrderPage
