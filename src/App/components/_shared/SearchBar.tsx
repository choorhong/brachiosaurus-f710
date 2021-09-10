import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip, Input } from 'antd'
import { capitalize } from 'lodash'

import { SearchBarProps } from '../types/searchbar'

const { Search } = Input

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const history = useHistory()

  const { advanceFilter, SearchProps, type = 'shipment' } = props

  const title = useMemo(() => {
    let label = `Add ${capitalize(type)}`

    if (type === 'purchase-order') {
      label = 'Add Purchase Order'
    }

    return label
  }, [type])

  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
      <Search {...SearchProps} />
      {advanceFilter}
      <Tooltip title={title}>
        <Button icon={<PlusOutlined />} onClick={() => history.push(`/${type}/create`)} />
      </Tooltip>
    </span>
  )
}

export default SearchBar
