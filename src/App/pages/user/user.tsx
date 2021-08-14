import React, { useEffect, useState } from 'react'
import Nav from '../../layout/Nav'
import { UserList } from '../../components/user'
import axiosAuth from '../../axios'

const UserPage: React.FC = (props) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosAuth.get('/auth/users')
        if (data) {
          setData(data)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  return (
    <Nav>
      <UserList data={data} />
    </Nav>
  )
}

export default UserPage
