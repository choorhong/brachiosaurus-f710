import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ContactForm } from '../../components/contact'
import { SubmitValues } from '../../components/types/contact'
import View from '../../components/_shared/View'
import Nav from '../../layout/Nav'
import axiosAuth from '../../axios'

const ViewContactPage: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosAuth.get(`/contact/${params.id}`)
        if (data) {
          setData({ ...data, role: data.roles[0] })
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [params.id])

  const handleDelete = async () => {
    try {
      const { status } = await axiosAuth.delete(`/contact/${params.id}`)
      if (status === 200) {
        return history.push('/contact')
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
        deleteBtnText='Delete Contact'
        editBtnText='Edit Contact'
        Form={ContactForm}
        onDelete={handleDelete}
      />
    </Nav>
  )
}

export default ViewContactPage
