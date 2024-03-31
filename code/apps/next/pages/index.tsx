import { NextPageContext } from 'next'
import getApiUrl from '../../../utils/getApiUrl'
import urlWithQuery from '../../../utils/urlWithQuery'
import { TextLink } from 'app/navigation/link'
import { TreeViewContext } from 'app/components/tree-view-context'
import { PageContainer } from 'app/components/page-container'
import { Accordion } from '@showtime-xyz/universal.accordion'
import { Button } from '@showtime-xyz/universal.button'
import { Input } from '@showtime-xyz/universal.input'
import { IndexData, SearchResultData } from '../../../types'
import { useCallback, useContext, useState, useEffect } from 'react'
import { Search } from '@showtime-xyz/universal.icon'
import { Text } from '@showtime-xyz/universal.text'
import { View } from '@showtime-xyz/universal.view'
import { ModalSheet } from '@showtime-xyz/universal.modal-sheet'
import { Spinner } from '@showtime-xyz/universal.spinner'
import { RadioGroup } from '@showtime-xyz/universal.radio'
import { useIsDarkMode } from '@showtime-xyz/universal.hooks'

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

  const [isLoading, setIsLoading] = useState(false)

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultData>(null)
  const [radioSelection, setRadioSelection] = useState('verses')

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery, type: radioSelection }),
      })
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isDark = useIsDarkMode()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchModalVisible(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <PageContainer>
        <Button
          variant="base"
          tw="mb-6 py-5 bg-warmGray-200 dark:bg-gray-800"
          onPress={() => setIsSearchModalVisible(true)}
        >
          <Search color={isDark ? '#FFF' : '#18181B'} />
          <Text tw="ml-2 font-semibold text-gray-900 dark:text-white">
            Search
          </Text>
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
                        const subCategories = category.subCategories

                        return subCategories.map((subCategory) => {
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
                        })
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
        headerShown={false}
        visible={isSearchModalVisible}
        close={() => {
          setIsSearchModalVisible(false)
          setTimeout(() => {
            setSearchQuery('')
            setSearchResults(null)
          }, 300)
        }}
        tw="sm:w-[640px]"
      >
        <View tw="px-4 min-h-[400px] pt-8">
          <View tw="mb-4 flex flex-row justify-between items-center ">
            <View tw="flex-grow">
              <Input
                leftElement={
                  <View tw="ml-3 mr-2">
                    {isLoading ? (
                      <Spinner size="small" />
                    ) : (
                      <Search
                        color={isDark ? '#FFF' : '#18181B'}
                        fontSize={24}
                      />
                    )}
                  </View>
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
                type="search"
                autoFocus
                placeholder="Search..."
                onKeyPress={(e) => {
                  if (e.nativeEvent.key === 'Enter') {
                    handleSearch()
                  }
                }}
                returnKeyType="search"
                enterKeyHint="search"
              />
            </View>
            <Button
              variant="base"
              onPress={() => setIsSearchModalVisible(false)}
            >
              <Text tw="text-base font-normal text-gray-900 dark:text-white">
                Cancel
              </Text>
            </Button>
          </View>
          <View tw="pl-4">
            <RadioGroup
              initialValue="verses"
              options={[
                { label: 'Verses', value: 'verses' },
                { label: 'Subcategories', value: 'subcategories' },
              ]}
              onSelect={setRadioSelection}
            />
          </View>
          <View tw="h-[20px]" />

          {searchResults && (
            <>
              {searchResults.subCatVal &&
                searchResults.subCatVal.map((subCategory) => (
                  <View
                    key={`result-sc.${subCategory.id}`}
                    tw="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded-lg"
                  >
                    <TextLink
                      href={`/subcategories/${subCategory.id.split('-')[1]}`}
                      tw="font-semibold text-gray-900 dark:text-white"
                    >
                      {subCategory.name}
                    </TextLink>
                  </View>
                ))}
              {searchResults.val &&
                searchResults.val.map((verse) => (
                  <View
                    key={`result-v.${verse.id}`} // Assuming verses have an 'id' property
                    tw="p-4 mb-4 bg-white dark:bg-gray-800 shadow rounded-lg"
                  >
                    {/* Render verse content. Adjust according to your actual verse data structure */}
                    <Text tw="mb-3 font-semibold text-gray-900 dark:text-white">
                      {verse.quote}
                    </Text>
                    <Text tw="text-gray-900 dark:text-white">
                      {verse.reference}
                    </Text>
                  </View>
                ))}
            </>
          )}
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
