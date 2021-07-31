import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ViewVesselPage: React.FC = (props) => {
  const params = useParams<{id: string}>()
  const [data, setData] = useState<Record<any, any>>()

  useEffect(() => {
    (async () => {
      try {
        const vessel = await axios.get(`${baseUrl}/vessel/${params.id}`)
        if (vessel && vessel.data) {
          setData(vessel.data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [params.id])

  return (
    <Nav>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Nav>
  )
}

export default ViewVesselPage
