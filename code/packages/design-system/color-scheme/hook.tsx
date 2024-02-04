import { useContext } from 'react'

import { ColorSchemeContext } from './context'

export const useColorScheme = () => {
  const colorSchemeContext = useContext(ColorSchemeContext)
  // Note: This breaks at runtime without giving this
  // error message if the user forgets to wrap their app
  if (!colorSchemeContext) {
    console.error(
      'Please wrap your app with <ColorSchemeProvider> from @showtime-xyz/universal.color-scheme'
    )
  }
  return colorSchemeContext
}
