import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'

import { IBookingFormProps, SubmitValues } from '../types/booking'
import { PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

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

const BookingForm: React.FC<IBookingFormProps> = ({ initialValues, onSave }) => {
  const [form] = Form.useForm()
  const history = useHistory()

  // TODO: Handle submit
  const handleSubmit = onSave || ((values: SubmitValues) => console.log(values))

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name='booking-form'
        onFinish={handleSubmit}
      >
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
              <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '38%' }} />
            </Form.Item>
            <Form.Item
              name={['departure', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Input location' />
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
              <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '38%' }} />
            </Form.Item>
            <Form.Item
              name={['arrival', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Input location' />
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

            <Button icon={<PlusOutlined />} onClick={() => history.push('/vessel/create')} />
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
          name='remarks'
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

export default BookingForm