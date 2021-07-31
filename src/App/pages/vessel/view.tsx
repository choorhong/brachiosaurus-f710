import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { VesselForm } from '../../components/vessel'
import { SubmitValues } from '../../components/types/vessel'
import { Button, Popconfirm } from 'antd'
import { EditOutlined, ExclamationOutlined } from '@ant-design/icons'

const { REACT_APP_BASE_URL: baseUrl } = process.env

const ViewVesselPage: React.FC = (props) => {
  const params = useParams<{id: string}>()
  const [data, setData] = useState<SubmitValues>()
  const [disabled, setDisabled] = useState<boolean>(true)

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
      {/* better t0 make the EditButton & DeleteButton below into its own compoenent (line 34-58) */}
      <>
        <Button
          icon={<EditOutlined />}
          style={{ margin: '0 2% 2% 0' }}
          onClick={() => { setDisabled(d => !d) }}
        >
          {disabled ? 'Edit Shipment' : 'Cancel Edit'}
        </Button>
        <Popconfirm
          title='Are you sure to delete?'
        // onConfirm={handleDelete}
          okText='Yes'
          okType='danger'
          cancelText='No'
        >
          <Button
            icon={<ExclamationOutlined />}
            style={{ margin: '0 2% 2% 0' }}
            danger
            type='ghost'
          >
            Delete Shipment
          </Button>
        </Popconfirm>
      </>
      {
        data ? <VesselForm initialValues={data} disabled={disabled} /> : <>Loading...</>
      }
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
    </Nav>
  )
}

export default ViewVesselPage
