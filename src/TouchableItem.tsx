/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 */
import React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  GestureResponderEvent,
  Insets,
} from 'react-native'

import BorderlessButton, { BorderlessButtonProps } from './BorderlessButton'

const ANDROID_VERSION_LOLLIPOP = 21

interface TouchableItemProps
  extends Omit<BorderlessButtonProps, 'activeOpacity'>,
    TouchableNativeFeedbackProps,
    Omit<TouchableOpacityProps, 'activeOpacity'> {
  activeOpacity?: number
  hitSlop?: Insets
  borderless: boolean
  disabled: boolean
  pressColor: string
  style: StyleProp<ViewStyle>
  onPress: (e: GestureResponderEvent | boolean) => void
}

export default class TouchableItem extends React.Component<TouchableItemProps> {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)',
  }

  render(): React.ReactNode {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (
      Platform.OS === 'android' &&
      Platform.Version >= ANDROID_VERSION_LOLLIPOP
    ) {
      const { style, ...rest } = this.props
      return (
        <TouchableNativeFeedback
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor,
            this.props.borderless,
          )}
        >
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TouchableNativeFeedback>
      )
    } else if (Platform.OS === 'ios') {
      return (
        <BorderlessButton
          hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
          disallowInterruption
          enabled={!this.props.disabled}
          {...this.props}
        >
          {this.props.children}
        </BorderlessButton>
      )
    } else {
      return (
        <TouchableOpacity {...this.props}>
          {this.props.children}
        </TouchableOpacity>
      )
    }
  }
}
