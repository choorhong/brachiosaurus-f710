import React from 'react'
import { Table, Tag, Space } from 'antd'

const columns = [
  {
    title: 'Vessel Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>
  },
  {
    title: 'ERD',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Cut Off',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: 'Note',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

const VesselList: React.FC = () => {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default VesselList
