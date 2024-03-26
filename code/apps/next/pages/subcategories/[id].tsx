import { SubCategoryDetailScreen } from 'app/screens/sub-category-detail-screen'
import getApiUrl from '../../../../utils/getApiUrl'
import urlWithQuery from '../../../../utils/urlWithQuery'
import { NextPageContext } from 'next'
import { SubcategoryDetailData, SubcategoryNavigation } from '../../../../types' // Assuming SubcategoryNavigation is a new type you've defined
import { PageContainer } from 'app/components/page-container'
import { TextLink } from 'app/navigation/link'
import { View } from '@showtime-xyz/universal.view'
import { Text } from '@showtime-xyz/universal.text'

type CategoryDetailProps = {
  data: SubcategoryDetailData
  navigation: SubcategoryNavigation // Assuming this includes next and previous subcategory info
}

const SubCategoryDetail = ({ data, navigation }: CategoryDetailProps) => {
  return (
    <PageContainer>
      <SubCategoryDetailScreen data={data} />
      <View tw="flex flex-1 flex-row justify-between mt-5 max-w-3xl mb-24">
        {navigation.prev && (
          <TextLink href={`/subcategories/${navigation.prev.id}`}>
            <View>
              <Text tw="text-gray-900 dark:text-white mb-1">Previous</Text>
              <Text tw="pt-2 text-gray-900 dark:text-white font-semibold">
                {navigation.prev.name}
              </Text>
            </View>
          </TextLink>
        )}
        {navigation.next && (
          <TextLink href={`/subcategories/${navigation.next.id}`}>
            <View tw="flex items-end">
              <Text tw="text-gray-900 dark:text-white mb-1">Next</Text>
              <Text tw="pt-2 text-gray-900 dark:text-white font-semibold">
                {navigation.next.name}
              </Text>
            </View>
          </TextLink>
        )}
      </View>
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
