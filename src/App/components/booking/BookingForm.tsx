import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, DatePicker, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'

import { BookingValues, SubmitValues } from '../types/booking'
import { IFormProps } from '../types/shared'
import InputSearch from '../_shared/InputSearch'
import PlacesAutocomplete from '../_shared/PlacesAutocomplete'
import axiosAuth from '../../axios'
import { layout, tailLayout } from '../style/layout'

const BookingForm: React.FC<IFormProps<BookingValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()

  const defaultValues = useMemo(() => {
    let initialVal = initialValues

    if (initialValues) {
      initialVal = {
        bookingId: initialValues.bookingId,
        vesselId: initialValues.vesselId,
        remarks: initialValues.remarks,
        forwarderId: initialValues.forwarderId,
        slots: initialValues.slots,
        departure: {
          date: moment(initialValues.departure.date),
          location: initialValues.departure.location
        },
        arrival: {
          date: moment(initialValues.arrival.date),
          location: initialValues.arrival.location
        }
      }
    }
    return initialVal
  }, [initialValues])

  const searchOptions = useMemo(() => {
    let options

    if (initialValues) {
      options = {
        forwarder: [{
          label: initialValues?.forwarder?.name,
          value: initialValues?.forwarder?.id
        }],
        vessel: [{
          label: initialValues?.vessel?.name,
          value: initialValues?.vessel?.id
        }]
      }
    }
    return options
  }, [initialValues])

  const handleSubmit = async (values: SubmitValues) => {
    let val = {
      ...values,
      bookingId: values.bookingId.trim().toUpperCase()
    }
    let url = '/booking/create'

    if (initialValues) {
      url = '/booking/update'
      val = { ...val, id: initialValues.id }
    }

    try {
      const { status } = await axiosAuth.post(url, val)
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
        initialValues={defaultValues}
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
          <InputSearch isContact disabled={disabled} searchOptions={searchOptions?.forwarder} placeholder='Search Forwarder' />
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
              <PlacesAutocomplete style={{ width: '60%' }} />
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
              <PlacesAutocomplete style={{ width: '60%' }} />
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
              <InputSearch isVessel disabled={disabled} searchOptions={searchOptions?.vessel} placeholder='Search Vessel' style={{ flex: 0.98 }} />
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
