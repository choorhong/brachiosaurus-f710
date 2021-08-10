import React, { useMemo } from 'react'
import { Form, Input, Button, Select } from 'antd'

import { IFormProps } from '../types/shared'
import { ShipmentValues, STATUS, SubmitValues } from '../types/shipment'
import InputSearch from '../_shared/InputSearch'

const layout = {
  labelCol: {
    sm: {
      span: 12
    },
    lg: {
      span: 6
    }
  },
  wrapperCol: {
    sm: {
      span: 12
    },
    lg: {
      span: 12
    }
  }
}

const tailLayout = {
  wrapperCol: {
    sm: {
      span: 12
    },
    lg: {
      offset: 6,
      span: 12
    }
  }
}

const { Option } = Select

const STATUS_OPTIONS = [
  { label: 'Created', value: STATUS.CREATED },
  { label: 'Scheduled', value: STATUS.SCHEDULED },
  { label: 'Shipped', value: STATUS.SHIPPED },
  { label: 'Fulfilled', value: STATUS.FULFILLED },
  { label: 'Paid', value: STATUS.PAID },
  { label: 'Canceled', value: STATUS.CANCELED }
]

const ShipmentForm: React.FC<IFormProps<ShipmentValues>> = ({ initialValues, disabled }) => {
  const [form] = Form.useForm()

  const defaultValues = useMemo(() => {
    let initialVal = initialValues

    if (initialValues) {
      initialVal = {
        purchaseOrderId: initialValues.purchaseOrderId,
        bookingId: initialValues.bookingId,
        vendorId: initialValues.vendorId,
        remarks: initialValues.remarks,
        status: initialValues.status,
        users: initialValues.users
      }
    }
    return initialVal
  }, [initialValues])

  // TODO: Handle submit
  const handleSubmit = (values: SubmitValues) => console.log(values)

  const searchOptions = useMemo(() => {
    let options

    if (initialValues) {
      options = {
        vendor: [{
          label: initialValues?.vendor?.name,
          value: initialValues?.vendor?.id
        }],
        purchaseOrder: [{
          label: initialValues?.purchaseOrder?.purchaseOrderId,
          value: initialValues?.purchaseOrder?.id
        }],
        booking: [{
          label: initialValues?.booking?.bookingId,
          value: initialValues?.booking?.id

        }]
      }
    }
    return options
  }, [initialValues])
  console.log('options', searchOptions)
  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={defaultValues ?? { status: STATUS.CREATED }}
        name='shipment-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='purchaseOrderId'
          label='Purchase Order'
          rules={[
            {
              required: true,
              message: 'Please select your purchase order!'
            }
          ]}
        >
          <InputSearch isPO disabled={disabled} searchOptions={searchOptions?.purchaseOrder} placeholder='Search Purchase Order' />
        </Form.Item>

        <Form.Item
          name='vendorId'
          label='Vendor'
          rules={[
            {
              required: true,
              message: 'Please select your vendor!'
            }
          ]}
        >
          <InputSearch isContact disabled={disabled} searchOptions={searchOptions?.vendor} placeholder='Search Vendor' />
        </Form.Item>

        <Form.Item
          name='bookingId'
          label='Booking'
          rules={[
            {
              required: true,
              message: 'Please select your booking!'
            }
          ]}
        >
          <InputSearch isBooking disabled={disabled} searchOptions={searchOptions?.booking} placeholder='Search Booking' />
        </Form.Item>

        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true }]}
        >
          <Select>
            {STATUS_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
          </Select>
        </Form.Item>

        <Form.Item
          name='users'
          label='Users'
          rules={[
            {
              required: true,
              message: 'Please select users!'
            }
          ]}
        >
          {/* TODO: Fix this when the actual user list is available */}
          <Select
            allowClear
            mode='multiple'
            placeholder='Please select users'
          >
            <Option value='user1'>User 1</Option>
            <Option value='user2'>User 2</Option>
            <Option value='user3'>User 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='remarks'
          label='Note/Remarks'
        >
          <Input.TextArea rows={4} disabled={disabled} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' disabled={disabled}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ShipmentForm
