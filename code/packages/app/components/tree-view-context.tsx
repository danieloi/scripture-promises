import React from 'react'

type TreeViewContextType = {
  selectedSuperCategory: string
  setSelectedSuperCategory: (name: string) => void
  selectedCategory: string
  setSelectedCategory: (name: string) => void
}

const TreeViewContext = React.createContext(
  null as unknown as TreeViewContextType
)

export { TreeViewContext }
