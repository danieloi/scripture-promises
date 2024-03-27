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

type BreadcrumbsProps = {
  breadcrumbs: SubcategoryBreadcrumbs
}

const homePath: SubcategoryBreadcrumbsPath = { name: 'Home', href: '/' }
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <ScrollView
      tw="w-full"
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
            {path.href ? (
              <TextLink
                style={{ flexShrink: 0 }}
                href={path.href}
                tw="text-gray-900 dark:text-white"
              >
                {path.name}
              </TextLink>
            ) : (
              <Text tw="text-gray-900 dark:text-white">{path.name}</Text>
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
