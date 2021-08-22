import React from 'react'
import { AutoComplete, Spin } from 'antd'
import usePlacesAutocomplete from 'use-places-autocomplete'

interface IPlacesAutocompleteProps {
  value?: string;
  onChange?: () => void;
  style?: React.CSSProperties
}

const PlacesAutocomplete: React.FC<IPlacesAutocompleteProps> = ({ value, onChange, style }) => {
  const { suggestions: { data, loading }, setValue } = usePlacesAutocomplete()
  const options = data.map(d => ({ value: d.description }))

  return (
    <AutoComplete
      allowClear
      notFoundContent={loading ? <Spin size='small' /> : null}
      onChange={onChange}
      onSearch={setValue}
      options={options}
      placeholder='Type and search a location'
      showSearch
      style={style}
      value={value}
    />
  )
}

export default PlacesAutocomplete
