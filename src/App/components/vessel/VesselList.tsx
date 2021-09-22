import React, { useMemo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Table } from 'antd'
import moment from 'moment'

const VesselList: React.FC<{ data: Record<string, any>, current: string }> = ({ data, current }) => {
  const history = useHistory()

  const columns = useMemo(() => [
    {
      title: 'Vessel Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, data: Record<any, any>) => <Link to={`/vessel/${data.id}`}>{text}</Link>
    },
    {
      title: 'ERD',
      dataIndex: 'earliestReturningDate',
      key: 'erd',
      render: (time: moment.Moment) => moment(time).format('YYYY-MM-DD').toString()
    },
    {
      title: 'Cut Off',
      key: 'cutOff',
      dataIndex: 'cutOff',
      render: (time: moment.Moment) => moment(time).format('YYYY-MM-DD').toString()
    }
  ], [])

  return (
    <Table
      columns={columns}
      dataSource={data.rows}
      rowKey={data => data.id}
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

export default VesselList
