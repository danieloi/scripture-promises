import { ColorSchemeProvider } from '@showtime-xyz/universal.color-scheme'
import { Dripsy } from './dripsy'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ColorSchemeProvider>
      <Dripsy>{children}</Dripsy>
    </ColorSchemeProvider>
  )
}
