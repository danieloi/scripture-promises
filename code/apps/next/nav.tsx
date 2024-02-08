import { NextPageContext } from 'next'
import getApiUrl from '../../utils/getApiUrl'
import urlWithQuery from '../../utils/urlWithQuery'
import { TextLink } from 'app/navigation/link'
import { View } from '@showtime-xyz/universal.view'
import { Accordion } from '@showtime-xyz/universal.accordion'
import { IndexData } from '../../types'
interface IndexProps {
  data: IndexData[]
  children: React.ReactNode
}

const Container = (props: any) => {
  return (
    <View tw={' bg-gray-100 p-4 md:p-10 dark:bg-gray-900'} style={{ flex: 1 }}>
      {props.children}
    </View>
  )
}

const Layout = ({ data, children }: IndexProps) => {
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
                              <TextLink
                                className='"pl-4 p-4 mb-2 '
                                href={`/subcategories/${subCategory.id}`}
                                tw=" font-semibold text-gray-900 dark:text-white"
                                key={subCategory.id}
                              >
                                {subCategory.name}
                              </TextLink>
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
}

Layout.getInitialProps = async (ctx: NextPageContext) => {
  const url = getApiUrl(urlWithQuery('/', ctx.query), ctx)
  const response = await fetch(url)
  const result = await response.json()

  return {
    data: result,
  }
}

export default Layout
