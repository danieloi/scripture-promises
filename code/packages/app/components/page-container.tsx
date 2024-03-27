import { ScrollView } from '@showtime-xyz/universal.scroll-view'

const PageContainer = (props: any) => {
  return (
    <ScrollView
      tw={' bg-gray-100 p-4 md:p-10 dark:bg-gray-900'}
      style={{ flex: 1 }}
    >
      {props.children}
    </ScrollView>
  )
}

export { PageContainer }
