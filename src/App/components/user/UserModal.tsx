import React from 'react'
import { Form, Modal, Select } from 'antd'

import axiosAuth from '../../axios'
import { layout } from '../style/layout'
import { ROLE, STATUS, SubmitValues } from '../types/user'

interface IUserModalProps {
  initialValues: SubmitValues | undefined,
  refetchUsers: () => Promise<void>,
  onClose: () => void
}

const { Option } = Select

const ROLE_OPTIONS = [
  { label: 'Super Admin', value: ROLE.SUPER_ADMIN },
  { label: 'Admin', value: ROLE.ADMIN },
  { label: 'Executive', value: ROLE.EXECUTIVE }
]

const STATUS_OPTIONS = [
  { label: 'Active', value: STATUS.ACTIVE },
  { label: 'Pending', value: STATUS.PENDING },
  { label: 'Suspended', value: STATUS.SUSPENDED }
]

const UserModal: React.FC<IUserModalProps> = ({ initialValues, refetchUsers, onClose }) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: SubmitValues) => {
    try {
      const { status } = await axiosAuth.patch(`/auth/${initialValues?.id}`, values)
      if (status === 200) {
        refetchUsers()
        onClose()
        return
      }
      throw new Error()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Modal
      okText='Save'
      onCancel={onClose}
      onOk={() => form.submit()}
      title='Edit Role & Status'
      visible
    >
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name='user-form'
        onFinish={handleSubmit}
      >
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
          name='status'
          label='Status'
          rules={[{ required: true }]}
        >
          <Select>
            {STATUS_OPTIONS.map(option => (<Option key={option.value} value={option.value}>{option.label}</Option>))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
