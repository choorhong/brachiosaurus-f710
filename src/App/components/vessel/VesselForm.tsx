import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, DatePicker } from 'antd'

import { SubmitValues } from '../types/vessel'
import { IFormProps } from '../types/shared'
import axios from 'axios'
import moment from 'moment'

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

const VesselForm: React.FC<IFormProps<SubmitValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()

  // TODO: Handle submit for both create & edit
  const handleSubmit = async (values: SubmitValues) => {
    let val = {
      ...values,
      name: values.name.trim().toUpperCase()
    }
    let url = `${baseUrl}/vessel/create`

    if (initialValues) { // for edit vessel
      url = `${baseUrl}/vessel/update`
      val = { ...val, id: initialValues.id }
    }

    try {
      const { status } = await axios.post(url, val)
      if (status === 200 || status === 201) {
        return history.push('/vessel')
      }
      throw new Error()
    } catch (error) {
      console.log('error', error)
    }
  }

  const defaultEditValues = useMemo(() => {
    if (!initialValues) return
    const { name, earliestReturningDate, cutOff, remarks } = initialValues
    return {
      name,
      earliestReturningDate: moment(earliestReturningDate),
      cutOff: moment(cutOff),
      remarks
    }
  }, [initialValues])

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        initialValues={defaultEditValues}
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
          <Input disabled={disabled} />
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
          <DatePicker style={{ width: '100%' }} disabled={disabled} />
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
          <DatePicker format='YYYY-MM-DD HH:mm' showTime={{ format: 'HH:mm' }} style={{ width: '100%' }} disabled={disabled} />
        </Form.Item>

        <Form.Item
          name='remarks'
          label='Note/Remarks'
        >
          <Input.TextArea rows={4} disabled={disabled} />
        </Form.Item>

        {/* {!initialValues && ( */}
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' disabled={disabled}>
            Submit
          </Button>
        </Form.Item>
        {/* )} */}
      </Form>
    </div>
  )
}

export default VesselForm
