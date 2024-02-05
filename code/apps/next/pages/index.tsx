// import { HomeScreen } from 'app/features/home/screen'
import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
import { Text } from '@showtime-xyz/universal.text'
import { View } from '@showtime-xyz/universal.view'
import { Accordion } from '@showtime-xyz/universal.accordion'
import { IndexData } from '../../../types'
interface IndexProps {
  data: IndexData[]
}

const Container = (props: any) => {
  return (
    <View tw={' bg-gray-100 p-10 dark:bg-gray-900'} style={{ flex: 1 }}>
      {props.children}
    </View>
  )
}

const Index = ({ data }: IndexProps) => {
  return (
    <Container>
      <Accordion.Root>
        {data.map((superCategory) => {
          return (
            <Accordion.Item
              tw="mb-4"
              key={superCategory.id}
              value={superCategory.name}
            >
              <Accordion.Trigger>
                <Accordion.Label>{superCategory.name}</Accordion.Label>
                <Accordion.Chevron />
              </Accordion.Trigger>
              <Accordion.Content>
                <Accordion.Root>
                  {superCategory.categories.map((category) => {
                    return (
                      <Accordion.Item key={category.id} value={category.name}>
                        <Accordion.Trigger>
                          <Accordion.Label>{category.name}</Accordion.Label>
                          <Accordion.Chevron lighter />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          {category.subCategories.map((subCategory) => {
                            return (
                              <Text tw="pl-4 mb-4" key={subCategory.id}>
                                {subCategory.name}
                              </Text>
                            )
                          })}
                        </Accordion.Content>
                      </Accordion.Item>
                    )
                  })}
                </Accordion.Root>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </Container>
  )

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
