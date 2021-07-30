import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Popconfirm, Table, Tag } from 'antd'

import ContactForm from './ContactForm'
import { ROLE, SubmitValues } from '../types/contact'

const ContactList: React.FC<{data: any[]}> = ({ data }) => {
  const [values, setValues] = useState<SubmitValues | null>(null)

  const columns = useMemo(() => [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, data: Record<any, any>) => <Link to={`/contact/${data.id}`}>{text}</Link>
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'role',
      render: (roles: string[]) => {
        let color = 'red'

        return roles.map((role: string) => {
          if (role === ROLE.FORWARDER) {
            color = 'geekblue'
          } else if (role === ROLE.VENDOR) {
            color = 'green'
          } else if (role === ROLE.LOGISTICS) {
            color = 'volcano'
          }

          return <Tag color={color} key={role}>{role}</Tag>
        })
      }
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
      <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
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