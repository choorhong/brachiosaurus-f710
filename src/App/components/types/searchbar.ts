import { SearchProps } from 'antd/lib/input/Search'

export interface SearchBarProps{
    advanceFilter?: React.ReactNode;
    SearchProps?: SearchProps;
    type?: string;
}
