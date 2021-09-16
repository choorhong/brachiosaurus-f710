import React from 'react'
import { DatePicker, Form } from 'antd'

import FilterButtonBuilder from '../_shared/FilterButtonBuilder'
import { FilterButtonProps } from '../types/filterButton'

const formItems = (
  <>
    <Form.Item
      name='cutOffStartDate'
      label='Cut Off Start Date'
    >
      <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item
      name='cutOffEndDate'
      label='Cut Off End Date'
    >
      <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
    </Form.Item>
  </>
)

const FilterButton: React.FC<FilterButtonProps> = props => (
  <FilterButtonBuilder
    cardStyle={{ width: 600 }}
    formItems={formItems}
    {...props}
  />
)

export default FilterButton
