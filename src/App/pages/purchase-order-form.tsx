import React from 'react'
import Nav from '../layout/Nav'
import { PurchaseOrderForm } from '../components/purchaseOrder'

const PurchaseOrderFormPage: React.FC = (props) => {
  return (
    <Nav>
      <PurchaseOrderForm />
    </Nav>
  )
}

export default PurchaseOrderFormPage
