import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'

import { ROLE } from '../types/contact'
import { PurchaseOrderValues, STATUS, SubmitValues } from '../types/purchaseOrder'
import { IFormProps } from '../types/shared'
import InputSearch from '../_shared/InputSearch'
import axiosAuth from '../../axios'
import { layout, tailLayout } from '../style/layout'

const { Option } = Select

const STATUS_OPTIONS = [
  { label: 'Created', value: STATUS.CREATED },
  { label: 'Fulfilled', value: STATUS.FULFILLED },
  { label: 'Canceled', value: STATUS.CANCELED }
]

const PurchaseOrderForm: React.FC<IFormProps<PurchaseOrderValues>> = ({ initialValues, disabled }) => {
  const history = useHistory()
  const [form] = Form.useForm()

  const defaultValues = useMemo(() => {
    let initialVal = initialValues

    if (initialValues) {
      initialVal = {
        purchaseOrderId: initialValues.purchaseOrderId,
        remarks: initialValues.remarks,
        status: initialValues.status,
        vendorId: initialValues.vendorId
      }
    }
    return initialVal
  }, [initialValues])

  const searchOptions = useMemo(() => {
    let options

    if (initialValues) {
      options = [{
        label: initialValues?.vendor?.name,
        value: initialValues?.vendor?.id
      }]
    }
    return options
  }, [initialValues])

  const handleSubmit = async (values: SubmitValues) => {
    let val = {
      ...values,
      purchaseOrderId: values.purchaseOrderId.trim().toUpperCase()
    }
    let url = '/purchase-order/create'

    if (initialValues) {
      url = '/purchase-order/update'
      val = { ...val, id: initialValues.id }
    }

    try {
      const { status } = await axiosAuth.post(url, val)
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
        initialValues={defaultValues}
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
          <InputSearch isContact disabled={disabled} searchOptions={searchOptions} placeholder='Search Vendor' />
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
