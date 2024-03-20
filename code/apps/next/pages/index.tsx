import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
import { TextLink } from 'app/navigation/link'
import { TreeViewContext } from 'app/components/tree-view-context'
import { PageContainer } from 'app/components/page-container'
import { Accordion } from '@showtime-xyz/universal.accordion'
import { IndexData } from '../../../types'
import { useCallback, useContext } from 'react'
interface IndexProps {
  data: IndexData[]
}

const Index = ({ data }: IndexProps) => {
  const {
    selectedCategory,
    selectedSuperCategory,
    setSelectedCategory,
    setSelectedSuperCategory,
  } = useContext(TreeViewContext)

  const handleSuperCategoryChange = useCallback(
    (name: string) => {
      setSelectedSuperCategory(name)
    },
    [setSelectedSuperCategory]
  )

  const handleCategoryChange = useCallback(
    (name: string) => {
      setSelectedCategory(name)
    },
    [setSelectedCategory]
  )

  return (
    <PageContainer>
      <Accordion.Root
        value={selectedSuperCategory}
        onValueChange={handleSuperCategoryChange}
      >
        {data.map((superCategory) => {
          return (
            <Accordion.Item
              tw="mb-4"
              key={`s.${superCategory.id}`}
              value={superCategory.name}
            >
              <Accordion.Trigger>
                <Accordion.Label>{superCategory.name}</Accordion.Label>
                <Accordion.Chevron />
              </Accordion.Trigger>
              <Accordion.Content>
                <Accordion.Root
                  onValueChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  {superCategory.categories.map((category) => {
                    return (
                      <Accordion.Item
                        key={`c.${category.id}`}
                        value={category.name}
                      >
                        <Accordion.Trigger>
                          <Accordion.Label>{category.name}</Accordion.Label>
                          <Accordion.Chevron lighter />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          {category.subCategories.map((subCategory) => {
                            return (
                              <TextLink
                                className='"pl-4 p-4  '
                                href={`/subcategories/${subCategory.id}`}
                                tw=" font-semibold text-gray-900 dark:text-white"
                                key={`sc.${subCategory.id}`}
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
    </PageContainer>
  )
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
