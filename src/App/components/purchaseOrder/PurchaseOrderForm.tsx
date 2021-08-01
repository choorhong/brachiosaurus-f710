import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import axios from 'axios'

import { ROLE } from '../types/contact'
import { STATUS, SubmitValues } from '../types/purchaseOrder'
import { IFormProps } from '../types/shared'

const { REACT_APP_BASE_URL: baseUrl } = process.env

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

const PurchaseOrderForm: React.FC<IFormProps<SubmitValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [vendorOptions, setVendorOptions] = useState<{ label: string, value: string}[]>([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/contact`)
        if (data) {
          const options = data.filter((d: any) => d.roles[0] === ROLE.VENDOR).map((d: any) => ({ label: d.name, value: d.id }))
          setVendorOptions(options)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    )()
  }, [])

  const handleSubmit = async (values: SubmitValues) => {
    let val = {
      ...values,
      purchaseOrderId: values.purchaseOrderId.trim().toUpperCase()
    }
    let url = `${baseUrl}/purchase-order/create`

    if (initialValues) {
      url = `${baseUrl}/purchase-order/update`
      val = { ...val, id: initialValues.id }
    }

    try {
      const { status } = await axios.post(url, val)
      if (status === 200 || status === 201) {
        return history.push('/purchase-order')
      }
      throw new Error()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name='purchase-order-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='purchaseOrderId'
          label='Purchase Order'
          rules={[
            {
              required: true,
              message: 'Please insert the PO number!'
            }
          ]}
        >
          <Input disabled={disabled} />
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
          <Select placeholder='Please select a vendor' disabled={disabled}>
            {vendorOptions.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
          </Select>
        </Form.Item>

        {initialValues && (
          <Form.Item
            name='status'
            label='Status'
            rules={[{ required: true }]}
          >
            <Select disabled={disabled}>
              {STATUS_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
            </Select>
          </Form.Item>
        )}

        {/* <Form.Item
          name='users'
          label='Users'
          rules={[
            {
              required: true,
              message: 'Please select users!'
            }
          ]}
        >
          TODO: Fix this when the actual user list is available
          <Select
            allowClear
            mode='multiple'
            placeholder='Please select users'
          >
            <Option value='user1'>User 1</Option>
            <Option value='user2'>User 2</Option>
            <Option value='user3'>User 3</Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          name='remarks'
          label='Note/Remarks'
        >
          <Input.TextArea rows={4} disabled={disabled} />
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
