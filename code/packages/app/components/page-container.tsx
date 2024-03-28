import { ScrollView } from '@showtime-xyz/universal.scroll-view'
import { View } from '@showtime-xyz/universal.view'

const PageContainer = (props: any) => {
  return (
    <View tw="bg-gray-100 dark:bg-gray-900 flex-1">
      <ScrollView tw={'  p-4 md:p-10  max-w-3xl'}>{props.children}</ScrollView>
    </View>
  )
}

export { PageContainer }
