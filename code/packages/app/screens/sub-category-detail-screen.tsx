import { View } from '@showtime-xyz/universal.view'
import { Text } from '@showtime-xyz/universal.text'

import { withColorScheme } from 'app/components/memo-with-theme'
import { SubcategoryDetailData } from '../../../types'

type SubCategoryDetailScreenProps = {
  data: SubcategoryDetailData
}
export const SubCategoryDetailScreen: React.FC<SubCategoryDetailScreenProps> =
  withColorScheme(({ data }) => {
    return (
      <View tw="p-4 bg-white dark:bg-black max-w-3xl rounded-2xl">
        <View tw="p-4 mb-4">
          <Text tw="text-lg font-bold !leading-relaxed !my-0 text-gray-900 dark:text-white">
            {data.name}
          </Text>
        </View>
        {data.promises.map((promise) => (
          <View
            key={promise.id}
            tw="mb-4 p-4 rounded-lg bg-white dark:bg-black"
          >
            <View tw="mb-4">
              <Text tw=" text-lg !leading-normal !my-0 font-semibold text-gray-900 dark:text-white">
                {promise.quote}
              </Text>
            </View>
            <Text tw="text-sm  text-gray-900 dark:text-white">
              {promise.reference}
            </Text>
          </View>
        ))}
      </View>
    )
  })
