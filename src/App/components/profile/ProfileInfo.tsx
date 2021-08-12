import React from 'react'
import { Form, Input, Button } from 'antd'
import { layout, tailLayout } from '../style/layout'

const ProfileInfo: React.FC = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (value: Record<string, any>) => {
    console.log(value)
  }

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        name='profile-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Email'
        >
          test@test.com
        </Form.Item>

        <Form.Item
          label='Name'
          name='name'
        >

          <Input />
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

export default ProfileInfo
