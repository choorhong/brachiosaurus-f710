import { SearchProps } from 'antd/lib/input/Search'

export interface SearchBarProps{
    advanceFilter?: React.ReactNode;
    searchProps?: SearchProps;
    type?: string;
}
