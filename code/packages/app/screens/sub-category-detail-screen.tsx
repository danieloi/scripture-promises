import { View } from '@showtime-xyz/universal.view'

import { withColorScheme } from 'app/components/memo-with-theme'

export const SubCategoryDetailScreen = withColorScheme(() => {
  return (
    <View tw="w-full flex-1 bg-white dark:bg-black">
      <View tw="md:max-w-screen-content mx-auto w-full flex-1 bg-white dark:bg-black"></View>
    </View>
  )
})
