import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
import { TextLink } from 'app/navigation/link'
import { TreeViewContext } from 'app/components/tree-view-context'
import { PageContainer } from 'app/components/page-container'
import { Accordion } from '@showtime-xyz/universal.accordion'
import { Button } from '@showtime-xyz/universal.button'
import { IndexData, SearchResultData } from '../../../types'
import { useCallback, useContext, useState } from 'react'
import { Search } from '@showtime-xyz/universal.icon'
import { Text } from '@showtime-xyz/universal.text'
import { View } from '@showtime-xyz/universal.view'
import { ModalSheet } from '@showtime-xyz/universal.modal-sheet'
import { TextInput } from '@showtime-xyz/universal.text-input'

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

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultData>(null)

  const handleSearch = async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: searchQuery }),
    })
    const data = await response.json()
    setSearchResults(data)
  }

  return (
    <>
      <PageContainer>
        <Button tw="mb-6 " onPress={() => setIsSearchModalVisible(true)}>
          <Search />
          <Text tw="ml-2 font-semibold">Search</Text>
        </Button>

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
                      if (category.isLeaf) {
                        const subCategory = category.subCategories[0]
                        return (
                          <Accordion.Item
                            key={`c.${category.id}`}
                            value={category.name}
                          >
                            <TextLink
                              className="pl-4 p-4 "
                              href={`/subcategories/${subCategory.id}`}
                              tw=" font-semibold text-gray-900 dark:text-white"
                              key={`sc.${subCategory.id}`}
                            >
                              {subCategory.name}
                            </TextLink>
                          </Accordion.Item>
                        )
                      }
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
                                  className="pl-4 p-4  "
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
      <ModalSheet
        alwaysLarge
        title=""
        visible={isSearchModalVisible}
        close={() => setIsSearchModalVisible(false)}
      >
        <View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            tw="text-black dark:text-white"
          />
          <Button onPress={handleSearch}>Search</Button>
          {searchResults &&
            searchResults.subCatVal.map((subCategory) => (
              <View
                key={`result-sc.${subCategory.id}`}
                tw="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded-lg"
              >
                <TextLink
                  href={`/subcategories/${subCategory.id}`}
                  tw="font-semibold text-gray-900 dark:text-white"
                >
                  {subCategory.name}
                </TextLink>
              </View>
            ))}
        </View>
      </ModalSheet>
    </>
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
