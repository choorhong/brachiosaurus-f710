import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const useQuery = () => {
  const { search } = useLocation()
  const searchQuery = useMemo(() => queryString.parse(search), [search])

  return {
    search,
    searchQuery,
    stringify: (obj: Record<string, any>) => queryString.stringify(obj, { skipNull: true, skipEmptyString: true })
  }
}
