import React from 'react'
import Nav from '../layout/Nav'
import { PurchaseOrderList } from '../components/purchaseOrder'

const PurchaseOrderPage: React.FC = (props) => {
  return (
    <Nav>
      <PurchaseOrderList />
    </Nav>
  )
}

export default PurchaseOrderPage
