import React from 'react'
import Nav from '../../layout/Nav'
import { VesselList } from '../../components/vessel'

const VesselPage: React.FC = (props) => {
  return (
    <Nav>
      <VesselList />
    </Nav>
  )
}

export default VesselPage
