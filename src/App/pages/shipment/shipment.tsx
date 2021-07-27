import React from 'react'
import SearchBar from '../../components/_shared/SearchBar'

import Nav from '../../layout/Nav'
import { ShipmentList } from '../../components/shipment'

const ShipmentPage: React.FC = (props) => {
  return (
    <Nav>
      <SearchBar type='shipment' placeholder='Search by Booking or Purchase Order' />
      <ShipmentList />
    </Nav>
  )
}

export default ShipmentPage
