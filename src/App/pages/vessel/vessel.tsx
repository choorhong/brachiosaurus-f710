import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Nav from '../../layout/Nav'
import SearchBar from '../../components/_shared/SearchBar'
import { VesselList } from '../../components/vessel'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const VesselPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const vessels = await axios.get(`${baseUrl}/vessel`)
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
      <SearchBar type='vessel' placeholder='Search by Vessel' />
      <VesselList data={data} />
    </Nav>
  )
}

export default VesselPage
