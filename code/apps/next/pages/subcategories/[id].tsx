import { SubCategoryDetailScreen } from 'app/screens/sub-category-detail-screen'
import getApiUrl from '../../../../utils/getApiUrl'
import urlWithQuery from '../../../../utils/urlWithQuery'
import { NextPageContext } from 'next'
import {
  SubcategoryBreadcrumbs,
  SubcategoryDetailData,
  SubcategoryNavigation,
} from '../../../../types'
import { PageContainer } from 'app/components/page-container'
import { NavigationLinks } from 'app/components/navigation-links'
import { Breadcrumbs } from 'app/components/breadcrumbs' // Import the Breadcrumbs component
import { View } from '@showtime-xyz/universal.view'

type CategoryDetailProps = {
  data: SubcategoryDetailData
  navigation: SubcategoryNavigation
  breadcrumbs: SubcategoryBreadcrumbs
}

const SubCategoryDetail = ({
  data,
  navigation,
  breadcrumbs,
}: CategoryDetailProps) => {
  return (
    <>
      <View tw={' bg-gray-100 dark:bg-gray-900'}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </View>
      <PageContainer>
        <SubCategoryDetailScreen data={data} />
        <NavigationLinks navigation={navigation} />
      </PageContainer>
    </>
  )
}

SubCategoryDetail.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/subcategories', ctx.query), ctx)

  const response = await fetch(url)
  const result = await response.json()

  return {
    data: result.data,
    navigation: result.navigation,
    breadcrumbs: result.breadcrumbs,
  }
}

export default SubCategoryDetail
