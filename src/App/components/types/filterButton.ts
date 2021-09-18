import { Store } from 'antd/lib/form/interface'

export interface FilterButtonProps {
  initialValues?: Store;
  onSave: (values: any) => void;
}
