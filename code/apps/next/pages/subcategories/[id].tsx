import { SubCategoryDetailScreen } from 'app/screens/sub-category-detail-screen'
import getApiUrl from '../../../../utils/getApiUrl'
import urlWithQuery from '../../../../utils/urlWithQuery'
import { NextPageContext } from 'next'
import { SubcategoryDetailData } from '../../../../types'

type CategoryDetailProps = {
  data: SubcategoryDetailData
}

const SubCategoryDetail = ({ data }: CategoryDetailProps) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

SubCategoryDetail.getInitialProps = async (ctx: NextPageContext) => {
  console.log({ query: ctx.query })
  const url = getApiUrl(urlWithQuery('/subcategories', ctx.query), ctx)

  const response = await fetch(url)

  const result = await response.json()

  console.log({ result })
  return {
    data: result,
  }
}

export default SubCategoryDetail
