import React from 'react'
import Nav from '../../layout/Nav'
import { VesselForm } from '../../components/vessel'

const CreateVesselPage: React.FC = (props) => {
  return (
    <Nav>
      <VesselForm />
    </Nav>
  )
}

export default CreateVesselPage
