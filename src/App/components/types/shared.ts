export interface IFormProps<T> {
  initialValues?: T;
  disabled?: boolean;
}

export interface IListProps {
  data: Record<string, any>;
  current: string;
  onPaginationChange: (page: number) => void;
}
