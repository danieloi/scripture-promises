import { NextPageContext } from 'next'

type Query = NextPageContext['query']

function toQueryString(query: Query) {
  // @ts-ignore
  return new URLSearchParams(query).toString()
}
// fix this later based on react native directory
export default function urlWithQuery(url: string, query: Query) {
  const queryWithoutEmptyParams: Record<string, string> = {}
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryWithoutEmptyParams[key] = Array.isArray(value)
        ? value.join(',')
        : value
    }
  })
  if (Object.keys(queryWithoutEmptyParams).length === 0) {
    return url
  } else {
    return `${url}?${toQueryString(queryWithoutEmptyParams)}`
  }
}
