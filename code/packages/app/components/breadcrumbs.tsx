import React from 'react'
import {
  SubcategoryBreadcrumbs,
  SubcategoryBreadcrumbsPath,
} from '../../../types'
import { TextLink } from 'app/navigation/link'
import { Text } from '@showtime-xyz/universal.text'
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

  const handleSelectChange = (selectedId: number) => {
    // Logic to navigate to the selected sibling
    router.push(`/subcategories/${selectedId}`)
  }

  return (
    <ScrollView
      // so we can scroll without triggering
      // the select component on mobile
      tw="w-full md:pb-0 pt-8 pb-8"
      horizontal
      aria-label="breadcrumb"
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
            {path.href && (
              <TextLink href={path.href} tw="text-gray-900 dark:text-white">
                {path.name}
              </TextLink>
            )}
            {!path.href && path?.siblings?.length !== 1 && (
              <Select
                options={path.siblings.map((sibling) => ({
                  label: sibling.name,
                  value: sibling.firstSubcategoryId || sibling.id,
                }))}
                onChange={handleSelectChange}
                size="small"
                placeholder={path.name}
                minimal
              />
            )}
            {!path.href && path?.siblings?.length === 1 && (
              <Text tw="text-gray-9000 dark:text-white">{path.name}</Text>
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
