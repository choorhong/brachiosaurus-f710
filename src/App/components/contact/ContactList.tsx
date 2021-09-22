import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Table, Tag } from 'antd'

import { ROLE } from '../types/contact'

const ContactList: React.FC<{ data: Record<string, any>, current: string }> = ({ data, current }) => {
  const history = useHistory()

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

  return (
    <Table
      columns={columns}
      dataSource={data.rows}
      rowKey={(data) => data.id}
      pagination={{
        current: +current,
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: data.count,
        simple: true,
        onChange: (page) => history.push(`?page=${page}`)
      }}
    />
  )
}

export default ContactList
