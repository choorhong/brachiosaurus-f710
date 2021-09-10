import React from 'react'
import { DatePicker, Form } from 'antd'

import FilterButtonBuilder from '../_shared/FilterButtonBuilder'
import InputSearch from '../_shared/InputSearch'
import PlacesAutocomplete from '../_shared/PlacesAutocomplete'
import { FilterButtonProps } from '../types/filterButton'

const formItems = (
  <>
    <Form.Item
      name='forwarder'
      label='Forwarder'
    >
      <InputSearch isContact placeholder='Search Forwarder' />
    </Form.Item>
    <Form.Item
      name='departureLocation'
      label='Departure Location'
    >
      <PlacesAutocomplete />
    </Form.Item>
    <Form.Item
      name='arrivalLocation'
      label='Arrival Location'
    >
      <PlacesAutocomplete />
    </Form.Item>
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

const FilterButton: React.FC<FilterButtonProps> = ({ onSave }) => (
  <FilterButtonBuilder
    cardStyle={{ width: 600 }}
    formItems={formItems}
    onSave={onSave}
  />
)

export default FilterButton
