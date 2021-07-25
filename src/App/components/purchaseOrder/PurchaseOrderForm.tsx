import React from 'react'
import { Form, Input, Button, Select } from 'antd'

import { STATUS, SubmitValues } from './interfaces'

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
  { label: 'Fulfilled', value: STATUS.FULFILLED },
  { label: 'Canceled', value: STATUS.CANCELED }
]

const PurchaseOrderForm: React.FC = (props) => {
  const [form] = Form.useForm()

  // TODO: Handle submit
  const handleSubmit = (values: SubmitValues) => console.log(values)

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={{ status: STATUS.CREATED }}
        name='create-purchase-order-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='vendor'
          label='Vendor'
          rules={[
            {
              required: true,
              message: 'Please select your vendor!'
            }
          ]}
        >
          {/* TODO: Fix this when the actual vendor list is available */}
          <Select placeholder='Please select a vendor'>
            <Option value='vendor1'>Vendor 1</Option>
            <Option value='vendor2'>Vendor 2</Option>
          </Select>
        </Form.Item>

        {/* TODO: Hide this if user is creating a new PO */}
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
          name='note'
          label='Note/Remarks'
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PurchaseOrderForm
