import React from 'react'
import { Form, Input, Button } from 'antd'
import { layout, tailLayout } from '../style/layout'
import { auth } from '../../../firebase'

const UpdatePassword: React.FC = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      // if user has login for quite sometime and wanted to update password, googleApi will ask the user to re-login again.
      // Might need to find a way to circumvent this problem, something like building modal asking the user to fill out the credetials again.
      const user = await auth.currentUser
      if (!user) throw new Error('System error, please try again later')
      user.updatePassword(value.password)
      // log user out after 3 seconds
    } catch (error) {
      console.log('error', error.message)
    }
  }

  return (
    <div style={{ padding: '2% 2%' }}>
      <Form
        {...layout}
        form={form}
        name='update-password-form'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='password'
          label='New Password'
          rules={[
            {
              required: true,
              message: 'Please input your vessel name!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >

          <Input.Password />
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

export default UpdatePassword
