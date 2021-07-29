import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'

import { SubmitValues } from '../types/booking'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

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

const BookingForm: React.FC = (props) => {
  const [form] = Form.useForm()

  // TODO: Handle submit
  const handleSubmit = async (values: SubmitValues) => {
    const val = {
      ...values,
      name: values.bookingId.trim().toUpperCase()
    }

    try {
      const result = await axios.post(`${baseUrl}/booking/create`, val)
      if (result && result.status === 201 && result.data) {
        console.log('result', result)
        // history.push(`/${baseUrl}/booking/${result.data.id}`)
      }
    } catch (error) {
      console.log('error', error)
    }

    console.log(values)
  }

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        name='create-booking-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='bookingId'
          label='Booking'
          rules={[
            {
              required: true,
              message: 'Booking number needed'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='forwarder'
          label='Forwarder'
          rules={[
            {
              required: true,
              message: 'Please select your forwarder!'
            }
          ]}
        >
          {/* TODO: Fix this when the actual forwarder list is available */}
          <Select placeholder='Please select a forwarder'>
            <Option value='forwarder1'>Forwarder 1</Option>
            <Option value='forwarder2'>Forwarder 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='departure'
          label='Departure'
          rules={[{ required: true, message: 'Departure is required' }]}
        >
          <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name={['departure', 'date']}
              noStyle
              rules={[{ required: true, message: 'ETD is required' }]}
            >
              <DatePicker style={{ width: '38%' }} />
            </Form.Item>
            <Form.Item
              name={['departure', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Departure Location' />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name='arrival'
          label='Arrival'
          rules={[{ required: true, message: 'Arrival is required' }]}
        >
          <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name={['arrival', 'date']}
              noStyle
              rules={[{ required: true, message: 'ETA is required' }]}
            >
              <DatePicker style={{ width: '38%' }} />
            </Form.Item>
            <Form.Item
              name={['arrival', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Arrival Location' />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label='Vessel'
          required
        >
          <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name='vessel'
              label='Vessel'
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please select your booking!'
                }
              ]}
            >
              {/* TODO: Create a pop up form for vessel? */}
              <Input style={{ width: '90%' }} />
            </Form.Item>

            <Button icon={<PlusOutlined />} />
          </Input.Group>
        </Form.Item>

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
          name='slots'
          label='Spaces'
          rules={[{ required: true, message: 'Number of booking spaces is required' }]}

        >
          <Input />
        </Form.Item>

        <Form.Item
          name='remarks'
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

export default BookingForm
