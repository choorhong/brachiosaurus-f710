import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip, Input, Row, Col } from 'antd'
import { capitalize } from 'lodash'

import { SearchBarProps } from '../types/searchbar'

const { Search } = Input

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const history = useHistory()

  const { advanceFilter, searchProps, type = 'shipment' } = props

  const title = useMemo(() => {
    let label = `Add ${capitalize(type)}`

    if (type === 'purchase-order') {
      label = 'Add Purchase Order'
    }

    return label
  }, [type])

  return (
  // <span style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
    <Row gutter={[4, 0]} style={{ marginBottom: 10 }}>
      <Col span={18}>
        <Search {...searchProps} />
      </Col>
      <Col span={5}>
        {advanceFilter}
      </Col>
      <Col span={1}>
        <Tooltip title={title}>
          <Button icon={<PlusOutlined />} style={{ width: '100%' }} onClick={() => history.push(`/${type}/create`)} />
        </Tooltip>
      </Col>

    </Row>
  // </span>
  )
}

export default SearchBar
