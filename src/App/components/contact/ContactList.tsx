import React, { useState, useMemo } from 'react'
import { Button, Modal, Popconfirm, Table, Tag } from 'antd'

import ContactForm from './ContactForm'
import { ROLE, SubmitValues } from './interfaces'

const data = [
  {
    key: '1',
    name: 'Company A',
    role: ROLE.FORWARDER,
    note: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Company B',
    role: ROLE.LOGISTICS,
    note: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Company C',
    role: ROLE.PURCHASER,
    note: 'Sidney No. 1 Lake Park'
  }
]

const ContactList: React.FC = () => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color: string
        if (role === ROLE.FORWARDER) {
          color = 'geekblue'
        } else if (role === ROLE.LOGISTICS) {
          color = 'green'
        } else if (role === ROLE.PURCHASER) {
          color = 'volcano'
        } else {
          color = 'purple'
        }

        return <Tag color={color}>{role}</Tag>
      }
    },
    {
      title: 'Note/Remarks',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Action',
      key: 'action',
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
            <Button key='save' type='primary' form='contact-form' htmlType='submit'>
              Save
            </Button>
          ]}
          onCancel={() => setValues(null)}
          title='Edit Contact'
          visible
        >
          <ContactForm initialValues={values} onSave={handleSave} />
        </Modal>
      )}
    </>
  )
}

export default ContactList
