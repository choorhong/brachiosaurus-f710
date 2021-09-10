import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/_shared/SearchBar'

import Nav from '../../layout/Nav'
import { ShipmentList } from '../../components/shipment'
import axiosAuth from '../../axios'

const ShipmentPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosAuth.get('/shipment')
        console.log('result', result)
        if (result && result.data) {
          setData(result.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <SearchBar
        type='shipment'
        SearchProps={{
          placeholder: 'Search by Booking or Purchase Order'
        }}
      />
      <ShipmentList data={data} />
    </Nav>
  )
}

export default ShipmentPage
