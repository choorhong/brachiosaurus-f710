import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table } from 'antd'
import moment from 'moment'

import VesselForm from './VesselForm'
import { SubmitValues } from './interfaces'

const data = [
  {
    key: '1',
    name: 'Vessel 1',
    erd: moment('2017-02-08'),
    cutOff: moment('2018-02-08 09:30'),
    note: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Vessel 2',
    erd: moment('2018-02-08'),
    cutOff: moment('2019-02-08 09:30'),
    note: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Vessel 3',
    erd: moment('2019-02-08'),
    cutOff: moment('2020-02-08 09:30'),
    note: 'Sidney No. 1 Lake Park'
  }
]

const VesselList: React.FC = () => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Vessel Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ERD',
      dataIndex: 'erd',
      key: 'erd',
      render: (time: moment.Moment) => time.format('YYYY-MM-DD').toString()
    },
    {
      title: 'Cut Off',
      key: 'cutOff',
      dataIndex: 'cutOff',
      render: (time: moment.Moment) => time.format('YYYY-MM-DD HH:mm').toString()
    },
    {
      title: 'Note/Remarks',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: SubmitValues) => {
        return (
          <>
            <Button onClick={() => setValues(record)} type='link' style={{ marginRight: 8, padding: 0 }}>
              Edit
            </Button>
            <Popconfirm title={`Are you sure you want to delete ${record.name}?`} onConfirm={() => console.log('delete', record.name)}>
              <Button type='link' style={{ padding: 0 }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )
      }
    }
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
