import { SubCategoryDetailScreen } from 'app/screens/sub-category-detail-screen'
import getApiUrl from '../../../../utils/getApiUrl'
import urlWithQuery from '../../../../utils/urlWithQuery'
import { NextPageContext } from 'next'
import { SubcategoryDetailData } from '../../../../types'
import { PageContainer } from 'app/components/page-container'

type CategoryDetailProps = {
  data: SubcategoryDetailData
}

const SubCategoryDetail = ({ data }: CategoryDetailProps) => {
  return (
    <PageContainer>
      <SubCategoryDetailScreen data={data} />
    </PageContainer>
  )
}

SubCategoryDetail.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/subcategories', ctx.query), ctx)

  const response = await fetch(url)

  const result = await response.json()

  return {
    data: result,
  }
}

export default SubCategoryDetail
