import React from 'react'
import { Form, Input, Button, Select } from 'antd'

import { IContactFormProps, ROLE, SubmitValues } from '../types/contact'

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

const ROLE_OPTIONS = [
  { label: 'Forwarder', value: ROLE.FORWARDER },
  { label: 'Logistics', value: ROLE.LOGISTICS },
  { label: 'Purchaser', value: ROLE.PURCHASER },
  { label: 'Vendor', value: ROLE.VENDOR }
]

const ContactForm: React.FC<IContactFormProps> = ({ initialValues, onSave }) => {
  const [form] = Form.useForm()

  // TODO: Handle submit
  const handleSubmit = onSave || ((values: SubmitValues) => console.log(values))

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues ?? { role: ROLE.VENDOR }}
        name='contact-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='name'
          label='Company Name'
          rules={[
            {
              required: true,
              message: 'Please input your company name!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='role'
          label='Role'
          rules={[{ required: true }]}
        >
          <Select>
            {ROLE_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
          </Select>
        </Form.Item>

        <Form.Item
          name='note'
          label='Note/Remarks'
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {!initialValues && (
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  )
}

export default ContactForm
