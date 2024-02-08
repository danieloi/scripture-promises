import { ColorSchemeProvider } from '@showtime-xyz/universal.color-scheme'
import { Dripsy } from './dripsy'
import { TreeViewContextProvider } from 'app/components/tree-view-context-provider'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ColorSchemeProvider>
      <TreeViewContextProvider>
        <Dripsy>{children}</Dripsy>
      </TreeViewContextProvider>
    </ColorSchemeProvider>
  )
}
