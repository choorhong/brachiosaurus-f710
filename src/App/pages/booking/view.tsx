import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { BookingForm } from '../../components/booking'
import { SubmitValues } from '../../components/types/booking'
import View from '../../components/_shared/View'
import Nav from '../../layout/Nav'
import axiosAuth from '../../axios'

const ViewBookingPage: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosAuth.get(`/booking/${params.id}`)
        if (result && result.data) {
          setData(result.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [params.id])

  const handleDelete = async () => {
    try {
      const { status } = await axiosAuth.delete(`/booking/${params.id}`)
      if (status === 200) {
        return history.push('/booking')
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
        deleteBtnText='Delete Booking'
        editBtnText='Edit Booking'
        Form={BookingForm}
        onDelete={handleDelete}
      />
    </Nav>
  )
}

export default ViewBookingPage
