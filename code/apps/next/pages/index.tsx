import { HomeScreen } from 'app/features/home/screen'
import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
interface IndexProps {
  data: any // Consider specifying a more detailed type instead of 'any' if possible
}

const Index = ({ data }: IndexProps) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>

  //   return <HomeScreen />
}

Index.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/', ctx.query), ctx)
  const response = await fetch(url)
  const result = await response.json()

  return {
    data: result,
  }
}

export default Index
