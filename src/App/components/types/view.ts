import React from 'react'
import { IFormProps } from './shared'

export interface IViewProps {
  data: any;
  deleteBtnText: string;
  editBtnText: string;
  Form: React.ComponentType<IFormProps<any>>
  onDelete: () => void
}
