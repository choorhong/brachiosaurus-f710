import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ShipmentForm } from '../../components/shipment'
import { SubmitValues } from '../../components/types/shipment'
import View from '../../components/_shared/View'
import Nav from '../../layout/Nav'
import axiosAuth from '../../axios'

const ViewShipmentPage: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()

  useEffect(() => {
    (async () => {
      try {
        const shipment = await axiosAuth.get(`/shipment/${params.id}`)
        if (shipment && shipment.data) {
          setData(shipment.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [params.id])

  const handleDelete = async () => {
    try {
      const { status } = await axiosAuth.delete(`/shipment/${params.id}`)
      if (status === 200) {
        return history.push('/')
      }
      throw new Error()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Nav>
      <View
        data={data}
        deleteBtnText='Delete Shipment'
        editBtnText='Edit Shipment'
        Form={ShipmentForm}
        onDelete={handleDelete}
      />
    </Nav>
  )
}

export default ViewShipmentPage
