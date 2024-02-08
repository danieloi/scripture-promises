import React from 'react'
import { TreeViewContext } from 'app/components/tree-view-context'

export const TreeViewContextProvider = ({ children }) => {
  const [selectedSuperCategory, setSelectedSuperCategory] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')

  const initialValue = {
    selectedSuperCategory,
    setSelectedSuperCategory,
    selectedCategory,
    setSelectedCategory,
  }

  return (
    <TreeViewContext.Provider value={initialValue}>
      {children}
    </TreeViewContext.Provider>
  )
}
