import { View } from '@showtime-xyz/universal.view'

const PageContainer = (props: any) => {
  return (
    <View tw={' bg-gray-100 p-4 md:p-10 dark:bg-gray-900'} style={{ flex: 1 }}>
      {props.children}
    </View>
  )
}

export { PageContainer }
