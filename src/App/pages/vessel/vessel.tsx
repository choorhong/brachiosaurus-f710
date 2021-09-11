import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import SearchBar from '../../components/_shared/SearchBar'
import { VesselList } from '../../components/vessel'
import axiosAuth from '../../axios'

const VesselPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const vessels = await axiosAuth.get('/vessel')
        console.log('vessels', vessels)
        if (vessels && vessels.data) {
          setData(vessels.data)
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
        type='vessel'
        searchProps={{
          placeholder: 'Search by Vessel'
        }}
      />
      <VesselList data={data} />
    </Nav>
  )
}

export default VesselPage
