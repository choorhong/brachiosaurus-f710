import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tag } from 'antd'

import { ROLE } from '../types/contact'

const ContactList: React.FC<{data: any[]}> = ({ data }) => {
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
  ], [])

  return <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
}

export default ContactList
