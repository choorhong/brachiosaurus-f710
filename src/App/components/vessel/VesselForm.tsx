import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'

import { SubmitValues } from './interfaces'

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

const VesselForm: React.FC = (props) => {
  const [form] = Form.useForm()

  // TODO: Handle submit
  const handleSubmit = (values: SubmitValues) => console.log(values)

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        name='create-vessel-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='name'
          label='Vessel Name'
          rules={[
            {
              required: true,
              message: 'Please input your vessel name!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='erd'
          label='Earliest Returning Date'
          rules={[
            {
              required: true,
              message: 'Please input the ERD!'
            }
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='cutOff'
          label='Cut Off'
          rules={[
            {
              required: true,
              message: 'Please input the cut off date!'
            }
          ]}
        >
          <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} />
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

export default VesselForm