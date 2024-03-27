import { View } from '@showtime-xyz/universal.view'
import { Text } from '@showtime-xyz/universal.text'
import { TextLink } from 'app/navigation/link'
import { SubcategoryNavigation } from '../../../types'

type NavigationLinkProps = {
  navigation: SubcategoryNavigation
}

export const NavigationLinks: React.FC<NavigationLinkProps> = ({
  navigation,
}) => {
  return (
    <View
      tw={`flex flex-1 flex-row ${
        navigation.prev ? 'justify-between' : 'justify-end'
      } mt-5 max-w-3xl mb-24`}
    >
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
            <Text tw="text-gray-900 dark:text-white mb-1 text-right">Next</Text>
            <Text tw="pt-2 text-gray-900 dark:text-white font-semibold text-right ">
              {navigation.next.name}
            </Text>
          </View>
        </TextLink>
      )}
    </View>
  )
}
