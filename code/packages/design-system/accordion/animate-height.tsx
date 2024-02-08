import { useEffectOnce } from '@showtime-xyz/universal.hooks'
import { useState } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

export type AnimateHeightProps = {
  children?: React.ReactNode
  /**
   * If `true`, the height will automatically animate to 0. Default: `false`.
   */
  hide?: boolean
  onHeightDidAnimate?: (height: number) => void
  initialHeight?: number
  style?: StyleProp<ViewStyle>
  extraHeight?: number
  shouldAnimateOnMount?: boolean
}
const transition = { duration: 200 } as const

function getTransition(shouldAnimate: boolean) {
  return shouldAnimate ? transition : { duration: 0 }
}

export function AnimateHeight({
  children,
  hide = false,
  style,
  onHeightDidAnimate,
  initialHeight = 0,
  extraHeight = 0,
  shouldAnimateOnMount = false,
}: AnimateHeightProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffectOnce(() => {
    setShouldAnimate(true)
  })

  const measuredHeight = useSharedValue(initialHeight)
  const childStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(
        !measuredHeight.value || hide ? 0 : 1,
        getTransition(shouldAnimate || shouldAnimateOnMount)
      ),
    }),
    [hide, measuredHeight, shouldAnimate, shouldAnimateOnMount]
  )

  const containerStyle = useAnimatedStyle(() => {
    return {
      willChange: 'transform, scroll-position, contents', // make it hardware accelerated on web
      height: withTiming(
        hide ? 0 : measuredHeight.value + extraHeight,
        getTransition(shouldAnimate || shouldAnimateOnMount),
        () => {
          if (onHeightDidAnimate) {
            runOnJS(onHeightDidAnimate)(measuredHeight.value + extraHeight)
          }
        }
      ),
    }
  }, [hide, measuredHeight, extraHeight])

  // stops flicker when it's open on mount and shouldAnimateOnMount is false
  // useful for when we hit back and we had an accordion open prior
  if (!hide && !shouldAnimate) {
    return (
      <Animated.View style={[style]}>
        <Animated.View
          onLayout={({ nativeEvent }) => {
            measuredHeight.value = Math.ceil(nativeEvent.layout.height)
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.hidden, style, containerStyle]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.autoBottom, childStyle]}
        onLayout={({ nativeEvent }) => {
          measuredHeight.value = Math.ceil(nativeEvent.layout.height)
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  autoBottom: {
    bottom: 'auto',
  },
  hidden: {
    overflow: 'hidden',
  },
})
