import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'

import { IVesselFormProps, SubmitValues } from '../types/vessel'
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

const VesselForm: React.FC<IVesselFormProps> = ({ initialValues, onSave }) => {
  const [form] = Form.useForm()

  // TODO: Handle submit for both create & edit
  const handleSubmit = onSave || (async (values: SubmitValues) => {
    const val = {
      ...values,
      name: values.name.trim().toUpperCase()
    }
    console.log('val', val)
    try {
      const result = await axios.post(`${baseUrl}/vessel/create`, val)
      if (result && result.status === 201 && result.data) {
        console.log('result', result)
        // history.push(`/${baseUrl}/purchase-order/${result.data.id}`)
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name='vessel-form'
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
          name='earliestReturningDate'
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

export default VesselForm
