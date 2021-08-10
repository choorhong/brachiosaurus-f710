import React, { useState, useMemo, useCallback } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import axiosAuth from '../../axios'

interface IInputSearchProps {
    debounceTimeout?: number;
    isBooking?: boolean;
    isPO?: boolean;
    isContact?: boolean;
    isVessel?: boolean;
    disabled?: boolean
    searchOptions?: any[]
    placeholder: string
    style?: any
}

const InputSearch: React.FC<IInputSearchProps> = (props) => {
  const { isBooking, isPO, isContact, isVessel, debounceTimeout = 800, searchOptions, ...rest } = props
  const [fetching, setFetching] = useState<boolean>(false)
  const [options, setOptions] = useState<any[] | undefined>(searchOptions)

  const searchOperation = useCallback(
    async (value) => {
      // Default to /purchase-order/search
      let url = `/purchase-order/search/?purchaseOrderId=${value}`
      if (isBooking) {
        url = `/booking/search/?bookingId=${value}`
      } else if (isContact) {
        url = `/contact/search/?name=${value}`
      } else if (isVessel) {
        url = `/vessel/search/?name=${value}`
      }

      try {
        const result = await axiosAuth.get(url)
        return result
      } catch (error) {
        console.log('error', error)
      }
    }, [isBooking, isContact, isVessel])

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value: string) => {
      setFetching(true)

      // Default to purchase-order
      let label = 'purchaseOrderId'
      if (isBooking) {
        label = 'bookingId'
      } else if (isContact || isVessel) {
        label = 'name'
      }

      try {
        const result = await searchOperation(value)
        if (result && result.data) {
          const options = result.data.map((data: Record<any, any>) => ({
            label: data[label],
            value: data.id
          }))
          setOptions(options)
          setFetching(false)
        }
      } catch (error) {
        console.log('error', error)
        setFetching(false)
      }
    }

    return debounce(loadOptions, debounceTimeout)
  }, [searchOperation, debounceTimeout, isBooking, isContact, isVessel])

  return (
    <Select
      allowClear
      // labelInValue
      filterOption={false}
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...rest}
      options={options}
    />
  )
}

export default InputSearch
