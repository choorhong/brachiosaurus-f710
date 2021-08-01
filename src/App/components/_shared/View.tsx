import React, { useState } from 'react'
import { Button, Popconfirm } from 'antd'
import { EditOutlined, ExclamationOutlined } from '@ant-design/icons'

import { IViewProps } from '../types/view'

const View: React.FC<IViewProps> = ({ data, deleteBtnText, editBtnText, Form, onDelete }) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  return (
    <>
      <Button
        icon={<EditOutlined />}
        style={{ margin: '0 2% 2% 0' }}
        onClick={() => setDisabled(d => !d)}
      >
        {disabled ? editBtnText : 'Cancel Edit'}
      </Button>
      <Popconfirm
        title='Are you sure to delete?'
        onConfirm={onDelete}
        okText='Yes'
        okType='danger'
        cancelText='No'
      >
        <Button
          icon={<ExclamationOutlined />}
          style={{ margin: '0 2% 2% 0' }}
          danger
          type='ghost'
        >
          {deleteBtnText}
        </Button>
      </Popconfirm>
      {data ? <Form initialValues={data} disabled={disabled} /> : 'Loading...'}
    </>
  )
}

export default View
