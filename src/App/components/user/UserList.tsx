import React, { useState, useMemo } from 'react'
import { Button, Table, Tag } from 'antd'

import { ROLE, SubmitValues, STATUS } from '../types/user'
import UserModal from './UserModal'

interface IUserListProps {
  data: any[],
  refetchUsers: () => Promise<void>
}

const UserList: React.FC<IUserListProps> = ({ data, refetchUsers }) => {
  const [values, setValues] = useState<SubmitValues | undefined>(undefined)

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
      render: (_: any, { id, role, status }: SubmitValues) => {
        return (
          <Button onClick={() => setValues({ id, role, status })} type='link' style={{ padding: 0 }}>
            Edit
          </Button>
        )
      }
    }
  ], [])

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
      {values && <UserModal initialValues={values} refetchUsers={refetchUsers} onClose={() => setValues(undefined)} />}
    </>
  )
}

export default UserList
