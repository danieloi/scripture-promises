// import { HomeScreen } from 'app/features/home/screen'
import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
import { Text } from '@showtime-xyz/universal.text'
import { View } from '@showtime-xyz/universal.view'
import { Accordion } from '@showtime-xyz/universal.accordion'
interface IndexProps {
  data: any // Consider specifying a more detailed type instead of 'any' if possible
}

const Container = (props: any) => {
  return (
    <View tw={' bg-gray-100 p-10 dark:bg-gray-900'} style={{ flex: 1 }}>
      {props.children}
    </View>
  )
}

export const Basic = () => (
  <Container>
    <Accordion.Root>
      <Accordion.Item value="hello" tw="mb-4">
        <Accordion.Trigger>
          <Accordion.Label>Label</Accordion.Label>
        </Accordion.Trigger>
        <Accordion.Content>
          <Text tw="text-gray-900 dark:text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
          </Text>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="world">
        <Accordion.Trigger>
          <Accordion.Label>Label</Accordion.Label>
          <Accordion.Chevron />
        </Accordion.Trigger>
        <Accordion.Content>
          <Text tw="text-gray-900 dark:text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
          </Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Container>
)

const Index = ({ data }: IndexProps) => {
  return <Basic />
  //   return <pre>{JSON.stringify(data, null, 2)}</pre>

  //   return <HomeScreen />
}

Index.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/', ctx.query), ctx)
  const response = await fetch(url)
  const result = await response.json()

  return {
    data: result,
  }
}

export default Index
