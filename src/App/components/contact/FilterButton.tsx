import React from 'react'
import { Form, Select } from 'antd'

import FilterButtonBuilder from '../_shared/FilterButtonBuilder'
import { FilterButtonProps } from '../types/filterButton'
import { ROLE_OPTIONS } from './constants'

const { Option } = Select

const formItems = (
  <>
    <Form.Item
      name='role'
      label='Role'
    >
      <Select allowClear placeholder='Select Role'>
        {ROLE_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
      </Select>
    </Form.Item>
  </>
)

const FilterButton: React.FC<FilterButtonProps> = props => (
  <FilterButtonBuilder
    formItems={formItems}
    {...props}
  />
)

export default FilterButton
