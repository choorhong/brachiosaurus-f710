import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <Link to='/contact'>{text}</Link>
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'roles',
    render: (roles: any) => (
      roles.map((role: string) => {
        let color = 'red'
        if (role === 'FORWARDER') {
          color = 'geekblue'
        }
        if (role === 'VENDOR') {
          color = 'green'
        }
        if (role === 'LOGISTICS') {
          color = 'volcano'
        }

        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        )
      })
    )
  }
]

const ContactList: React.FC<{data: any[]}> = (props) => {
  const { data } = props
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default ContactList
