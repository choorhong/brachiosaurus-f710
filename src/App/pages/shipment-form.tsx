import React from 'react'
import Nav from '../layout/Nav'
import { ShipmentForm } from '../components/shipment'

const ShipmentFormPage: React.FC = (props) => {
  return (
    <Nav>
      <ShipmentForm />
    </Nav>
  )
}

export default ShipmentFormPage
