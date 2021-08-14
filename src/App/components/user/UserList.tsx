import React, { useMemo } from 'react'
import { Table, Tag } from 'antd'

import { ROLE, STATUS } from '../types/user'
import { Link } from 'react-router-dom'

const UserList: React.FC<{data: any[]}> = ({ data }) => {
  const columns = useMemo(() => [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role & Status',
      key: 'roleStatus',
      render: ({ role, status }: { role: string, status: string }) => {
        let roleColor = 'pink'
        let statusColor = 'green'

        if (role === ROLE.ADMIN) {
          roleColor = 'geekblue'
        } else if (role === ROLE.EXECUTIVE) {
          roleColor = 'purple'
        }

        if (status === STATUS.PENDING) {
          statusColor = 'yellow'
        } else if (status === STATUS.SUSPENDED) {
          statusColor = 'red'
        }

        return (
          <>
            <Tag color={roleColor} key={role}>{role}</Tag>
            <Tag color={statusColor} key={status}>{status}</Tag>
          </>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: (id: string) => <Link to={`/auth/${id}`}>Edit</Link>
    }
  ], [])

  return <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
}

export default UserList
