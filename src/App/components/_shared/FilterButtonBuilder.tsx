import React, { useCallback, useState } from 'react'
import { Button, Card, Dropdown, Form } from 'antd'
import { Store } from 'antd/lib/form/interface'
import FilterOutlined from '@ant-design/icons/lib/icons/FilterOutlined'

import { filterLayout } from '../style/layout'

interface IFilterProps {
  cardStyle?: React.CSSProperties;
  formItems: React.ReactNode;
  initialValues?: Store;
}

interface IFilterButtonBuilderProps extends IFilterProps {
  onSave: (values: any) => void;
}

interface IFilterFormProps extends IFilterProps {
  onSubmit: (values: any) => void;
}

const FilterForm: React.FC<IFilterFormProps> = ({ cardStyle, formItems, initialValues, onSubmit }) => {
  const [form] = Form.useForm()

  return (
    <Card
      title='Filters'
      extra={(
        <Button type='link' onClick={() => form.submit()}>
          Save Filters
        </Button>
      )}
      style={{ ...cardStyle, minWidth: 300 }}
    >
      <Form
        {...filterLayout}
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        {formItems}
      </Form>
    </Card>
  )
}

const FilterButtonBuilder: React.FC<IFilterButtonBuilderProps> = ({ onSave, ...others }) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleSubmit = useCallback((values: Record<string, any>) => {
    onSave(values)
    setVisible(false)
  }, [onSave])

  return (
    <Dropdown
      onVisibleChange={setVisible}
      overlay={<FilterForm {...others} onSubmit={handleSubmit} />}
      trigger={['click']}
      visible={visible}
    >
      <Button icon={<FilterOutlined />}>Advanced Filter</Button>
    </Dropdown>
  )
}

export default FilterButtonBuilder
