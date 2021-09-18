import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'

import { ROLE, SubmitValues } from '../types/contact'
import { IFormProps } from '../types/shared'
import axiosAuth from '../../axios'
import { layout, tailLayout } from '../style/layout'
import { ROLE_OPTIONS } from './constants'

const { Option } = Select

const ContactForm: React.FC<IFormProps<SubmitValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()

  const handleSubmit = async (values: SubmitValues) => {
    let val = {
      ...values,
      name: values.name.trim().toUpperCase()
    }
    let url = '/contact/create'

    if (initialValues) {
      url = '/contact/update'
      val = { ...val, id: initialValues.id }
    }

    try {
      const { status } = await axiosAuth.post(url, val)
      if (status === 200 || status === 201) {
        return history.push('/contact')
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
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          name='role'
          label='Role'
          rules={[{ required: true }]}
        >
          <Select disabled={disabled}>
            {ROLE_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
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

export default ContactForm
