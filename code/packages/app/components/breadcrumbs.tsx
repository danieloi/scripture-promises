import React, { useState } from 'react'
import {
  SubcategoryBreadcrumbs,
  SubcategoryBreadcrumbsPath,
} from '../../../types'
import { TextLink } from 'app/navigation/link'
import { View } from '@showtime-xyz/universal.view'
import { ChevronRightIcon } from './chevron-right-icon'
import { ScrollView } from '@showtime-xyz/universal.scroll-view'
import { Select } from '@showtime-xyz/universal.select'
import { useRouter } from '@showtime-xyz/universal.router'

type BreadcrumbsProps = {
  breadcrumbs: SubcategoryBreadcrumbs
}

const homePath: SubcategoryBreadcrumbsPath = { name: 'Home', href: '/' }
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const router = useRouter()
  const [isScrolling, setIsScrolling] = useState(false)

  const handleSelectChange = (selectedId: number) => {
    // Logic to navigate to the selected sibling
    router.push(`/subcategories/${selectedId}`)
  }

  const handleTouchStart = () => {
    setIsScrolling(false)
  }

  const handleTouchMove = () => {
    setIsScrolling(true)
  }

  const handleTouchEnd = () => {
    // Optionally, you could set a timeout here to reset isScrolling after a delay
    // to ensure that a tap after scrolling does not trigger the dropdown.
    setIsScrolling(false)
  }

  return (
    <ScrollView
      tw="w-full"
      horizontal
      aria-label="breadcrumb"
      // onScrollBeginDrag={() => setIsScrolling(true)}
      // onScrollEndDrag={() => setIsScrolling(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      showsHorizontalScrollIndicator={false}
    >
      {[homePath, ...breadcrumbs.path].map((path, index) => {
        if (path.isLeaf) {
          return null
        }

        return (
          <View
            key={index}
            tw={`flex-row items-center ${index === 0 ? 'pl-4 md:pl-10' : ''} ${
              index === breadcrumbs.path.length ? 'pr-10' : ''
            }`}
          >
            {path.href ? (
              <TextLink
                style={{ flexShrink: 0 }}
                href={path.href}
                tw="text-gray-900 dark:text-white"
              >
                {path.name}
              </TextLink>
            ) : (
              <Select
                options={path.siblings.map((sibling) => ({
                  label: sibling.name,
                  value: sibling.firstSubcategoryId || sibling.id,
                }))}
                onChange={handleSelectChange}
                size="small"
                placeholder={path.name}
                minimal
                // disabled={isScrolling}
                // disabled
              />
              // <Text tw="text-gray-900 dark:text-white">{path.name}</Text>
            )}
            {index < breadcrumbs.path.length && (
              <View tw="ml-2 mr-2">
                <ChevronRightIcon />
              </View>
            )}
          </View>
        )
      })}
    </ScrollView>
  )
}
