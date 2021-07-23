import React from 'react'
import Nav from '../../layout/Nav'
import { ShipmentList } from '../../components/shipment'

const ShipmentPage: React.FC = (props) => {
  return (
    <Nav>
      <ShipmentList />
    </Nav>
  )
}

export default ShipmentPage
