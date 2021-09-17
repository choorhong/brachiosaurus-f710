import React from 'react'
import { Form, Select } from 'antd'

import InputSearch from '../_shared/InputSearch'
import FilterButtonBuilder from '../_shared/FilterButtonBuilder'
import { FilterButtonProps } from '../types/filterButton'
import { STATUS_OPTIONS } from './constants'

const { Option } = Select

const formItems = (
  <>
    <Form.Item name='vendor' label='Vendor'>
      <InputSearch isContact placeholder='Search Vendor' />
    </Form.Item>
    <Form.Item name='bookingId' label='Booking'>
      <InputSearch isBooking placeholder='Search Booking' />
    </Form.Item>
    <Form.Item name='status' label='Status'>
      <Select allowClear placeholder='Select Status'>
        {STATUS_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
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
