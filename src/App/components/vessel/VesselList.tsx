import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table } from 'antd'
import moment from 'moment'

import VesselForm from './VesselForm'
import { SubmitValues } from '../types/vessel'
import { Link } from 'react-router-dom'

const VesselList: React.FC<{data: any[]}> = ({ data }) => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Vessel Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Link to='/vessel'>{text}</Link>
    },
    {
      title: 'ERD',
      dataIndex: 'earliestReturningDate',
      key: 'erd',
      render: (time: moment.Moment) => moment(time).format('YYYY-MM-DD').toString()
    },
    {
      title: 'Cut Off',
      key: 'cutOff',
      dataIndex: 'cutOff',
      render: (time: moment.Moment) => moment(time).format('YYYY-MM-DD').toString()

    }
    // {
    //   title: 'Note/Remarks',
    //   dataIndex: 'remarks',
    //   key: 'remarks'
    // },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_: any, record: SubmitValues) => {
    //     return (
    //       <>
    //         <Button onClick={() => setValues(record)} type='link' style={{ marginRight: 8, padding: 0 }}>
    //           Edit
    //         </Button>
    //         <Popconfirm title={`Are you sure you want to delete ${record.name}?`} onConfirm={() => console.log('delete', record.name)}>
    //           <Button type='link' style={{ padding: 0 }}>
    //             Delete
    //           </Button>
    //         </Popconfirm>
    //       </>
    //     )
    //   }
    // }
  ], [])

  // TODO: Handle save
  const handleSave = (values: SubmitValues) => {
    console.log(values)
    setValues(null)
  }

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {values && (
        <Modal
          footer={[
            <Button key='cancel' onClick={() => setValues(null)}>
              Cancel
            </Button>,
            <Button key='save' type='primary' form='vessel-form' htmlType='submit'>
              Save
            </Button>
          ]}
          onCancel={() => setValues(null)}
          title='Edit Vessel'
          visible
        >
          <VesselForm initialValues={values} onSave={handleSave} />
        </Modal>
      )}
    </>
  )
}

export default VesselList
