import React from 'react'
import { useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip, Input } from 'antd'

import { SearchBarProps } from '../types/searchbar'

const { Search } = Input

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const history = useHistory()

  const { type = 'shipment', placeholder = 'Search' } = props

  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
      <Search placeholder={placeholder} />
      <Tooltip title='Add Shipment'>
        <Button icon={<PlusOutlined />} onClick={() => history.push(`/${type}/create`)} />
      </Tooltip>
    </span>

  )
}

export default SearchBar
