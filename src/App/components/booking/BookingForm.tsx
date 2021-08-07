import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { Form, Input, Button, Select, DatePicker, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'

import { ROLE } from '../types/contact'
import { SubmitValues } from '../types/booking'
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

const BookingForm: React.FC<IFormProps<SubmitValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [forwarderOptions, setForwarderOptions] = useState<{ label: string, value: string}[]>([])
  const [vesselOptions, setVesselOptions] = useState<{ label: string, value: string}[]>([])
  let modifiedInitialValues: SubmitValues | undefined

  if (initialValues) {
    modifiedInitialValues = cloneDeep(initialValues)
    modifiedInitialValues.departure.date = moment(modifiedInitialValues.departure.date)
    modifiedInitialValues.arrival.date = moment(modifiedInitialValues.arrival.date)
  }

  useEffect(() => {
    (async () => {
      try {
        const { data: contacts } = await axios.get(`${baseUrl}/contact`)
        const { data: vessels } = await axios.get(`${baseUrl}/vessel`)
        if (contacts) {
          const options = contacts.filter((d: any) => d.roles[0] === ROLE.FORWARDER).map((d: any) => ({ label: d.name, value: d.id }))
          setForwarderOptions(options)
        }

        if (vessels) {
          const options = vessels.map((vessel: any) => ({ label: vessel.name, value: vessel.id }))
          setVesselOptions(options)
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
      bookingId: values.bookingId.trim().toUpperCase()
    }
    let url = `${baseUrl}/booking/create`

    if (modifiedInitialValues) {
      url = `${baseUrl}/booking/update`
      val = { ...val, id: modifiedInitialValues.id }
    }

    try {
      const { status } = await axios.post(url, val)
      if (status === 200 || status === 201) {
        return history.push('/booking')
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
        initialValues={modifiedInitialValues}
        name='booking-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='bookingId'
          label='Booking'
          rules={[
            {
              required: true,
              message: 'Please insert the booking number!'
            }
          ]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          name='forwarderId'
          label='Forwarder'
          rules={[
            {
              required: true,
              message: 'Please select your forwarder!'
            }
          ]}
        >
          <Select placeholder='Please select a forwarder' disabled={disabled}>
            {forwarderOptions.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
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
              <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '38%' }} disabled={disabled} />
            </Form.Item>
            <Form.Item
              name={['departure', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Input location' disabled={disabled} />
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
              <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '38%' }} disabled={disabled} />
            </Form.Item>
            <Form.Item
              name={['arrival', 'location']}
              noStyle
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input style={{ width: '60%' }} placeholder='Input location' disabled={disabled} />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label='Vessel'
          required
        >
          <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name='vesselId'
              label='Vessel'
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please select your vessel!'
                }
              ]}
            >
              <Select style={{ width: '90%' }} placeholder='Please select a vessel' disabled={disabled}>
                {vesselOptions.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
              </Select>
            </Form.Item>

            <Button icon={<PlusOutlined />} onClick={() => history.push('/vessel/create')} disabled={disabled} />
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
          label='Slots'
          rules={[
            {
              required: true,
              message: 'Please insert the slots!'
            }
          ]}
        >
          <InputNumber disabled={disabled} />
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

export default BookingForm
