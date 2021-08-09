import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { PurchaseOrderForm } from '../../components/purchaseOrder'
import { SubmitValues } from '../../components/types/purchaseOrder'
import View from '../../components/_shared/View'
import Nav from '../../layout/Nav'
import axiosAuth from '../../axios'

const ViewPurchaseOrderPage: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosAuth.get(`/purchase-order/${params.id}`)
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
      const { status } = await axiosAuth.delete(`/purchase-order/${params.id}`)
      if (status === 200) {
        return history.push('/purchase-order')
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
        deleteBtnText='Delete Purchase Order'
        editBtnText='Edit Purchase Order'
        Form={PurchaseOrderForm}
        onDelete={handleDelete}
      />
    </Nav>
  )
}

export default ViewPurchaseOrderPage
