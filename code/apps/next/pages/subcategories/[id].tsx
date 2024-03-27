import { SubCategoryDetailScreen } from 'app/screens/sub-category-detail-screen'
import getApiUrl from '../../../../utils/getApiUrl'
import urlWithQuery from '../../../../utils/urlWithQuery'
import { NextPageContext } from 'next'
import { SubcategoryDetailData, SubcategoryNavigation } from '../../../../types' // Assuming SubcategoryNavigation is a new type you've defined
import { PageContainer } from 'app/components/page-container'
import { NavigationLinks } from 'app/components/navigation-links'

type CategoryDetailProps = {
  data: SubcategoryDetailData
  navigation: SubcategoryNavigation // Assuming this includes next and previous subcategory info
}

const SubCategoryDetail = ({ data, navigation }: CategoryDetailProps) => {
  return (
    <PageContainer>
      <SubCategoryDetailScreen data={data} />
      <NavigationLinks navigation={navigation} />
    </PageContainer>
  )
}

SubCategoryDetail.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/subcategories', ctx.query), ctx)

  const response = await fetch(url)
  const result = await response.json()

  return {
    data: result.data,
    navigation: result.navigation,
  }
}

export default SubCategoryDetail
