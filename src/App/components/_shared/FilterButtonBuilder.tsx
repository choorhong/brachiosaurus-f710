import React, { useCallback, useState } from 'react'
import { Button, Card, Dropdown, Form } from 'antd'
import FilterOutlined from '@ant-design/icons/lib/icons/FilterOutlined'

import { filterLayout } from '../style/layout'

interface IFilterButtonBuilderProps {
  formItems: React.ReactNode;
  onSave: (values: any) => void;
}

interface IFilterFormProps {
  formItems: React.ReactNode;
  onSubmit: (values: any) => void;
}

const FilterForm: React.FC<IFilterFormProps> = ({ formItems, onSubmit }) => {
  const [form] = Form.useForm()

  return (
    <Card
      title='Filters'
      extra={(
        <Button type='link' onClick={() => form.submit()}>
          Save Filters
        </Button>
      )}
      style={{ minWidth: 300 }}
    >
      <Form
        {...filterLayout}
        form={form}
        onFinish={onSubmit}
      >
        {formItems}
      </Form>
    </Card>
  )
}

const FilterButtonBuilder: React.FC<IFilterButtonBuilderProps> = ({ formItems, onSave }) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleSubmit = useCallback((values: Record<string, any>) => {
    onSave(values)
    setVisible(false)
  }, [onSave])

  return (
    <Dropdown
      onVisibleChange={setVisible}
      overlay={<FilterForm formItems={formItems} onSubmit={handleSubmit} />}
      trigger={['click']}
      visible={visible}
    >
      <Button icon={<FilterOutlined />}>Advanced Filter</Button>
    </Dropdown>
  )
}

export default FilterButtonBuilder
