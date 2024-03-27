import { SvgProps } from 'react-native-svg'

import { useIsDarkMode } from '@showtime-xyz/universal.hooks'
import { ChevronRight } from '@showtime-xyz/universal.icon'
import { colors } from '@showtime-xyz/universal.tailwind'

interface ChevronRightIconProps extends SvgProps {}

export const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  ...rest
}) => {
  const isDarkMode = useIsDarkMode()

  return (
    <ChevronRight
      fill={isDarkMode ? colors.gray[100] : colors.gray[900]}
      {...rest}
    />
  )
}
