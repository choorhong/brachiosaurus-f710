import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { VesselForm } from '../../components/vessel'
import { SubmitValues } from '../../components/types/vessel'
import View from '../../components/_shared/View'
import Nav from '../../layout/Nav'
import axiosAuth from '../../axios'

const ViewVesselPage: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()

  useEffect(() => {
    (async () => {
      try {
        const vessel = await axiosAuth.get(`/vessel/${params.id}`)
        if (vessel && vessel.data) {
          setData(vessel.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [params.id])

  const handleDelete = async () => {
    try {
      const { status } = await axiosAuth.delete(`/vessel/${params.id}`)
      if (status === 200) {
        return history.push('/vessel')
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
        deleteBtnText='Delete Vessel'
        editBtnText='Edit Vessel'
        Form={VesselForm}
        onDelete={handleDelete}
      />
    </Nav>
  )
}

export default ViewVesselPage
