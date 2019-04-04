import React from 'react'
import { Animated, Platform } from 'react-native'
import { BaseButton, BaseButtonProperties } from 'react-native-gesture-handler'

const AnimatedBaseButtonTest = Animated.createAnimatedComponent(BaseButton)

export interface BorderlessButtonProps extends BaseButtonProperties {
  activeOpacity: number
  enabled: boolean
}

export default class BorderlessButton extends React.Component<
  BorderlessButtonProps
> {
  _opacity: Animated.Value

  static defaultProps = {
    activeOpacity: 0.3,
    borderless: true,
  }

  constructor(props: BorderlessButtonProps) {
    super(props)
    this._opacity = new Animated.Value(1)
  }

  _onActiveStateChange = (active: boolean): void => {
    if (Platform.OS !== 'android') {
      Animated.spring(this._opacity, {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        toValue: active ? this.props.activeOpacity : 1,
        useNativeDriver: true,
      }).start()
    }

    this.props.onActiveStateChange && this.props.onActiveStateChange(active)
  }

  render(): React.ReactNode {
    const { children, style, enabled, ...rest } = this.props

    return (
      <AnimatedBaseButtonTest
        {...rest}
        onActiveStateChange={this._onActiveStateChange}
        style={[
          style,
          Platform.OS === 'ios' && enabled && { opacity: this._opacity },
        ]}
      >
        {children}
      </AnimatedBaseButtonTest>
    )
  }
}
