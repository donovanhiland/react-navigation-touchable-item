/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import TouchableItem from '../TouchableItem'

const test1 = (
  <TouchableItem
    disabled={false}
    style={[{ width: 0 }, false && { height: 0 }]}
    onPress={(): undefined => undefined}
  />
)

const test2 = (
  <TouchableItem disabled style={null} onPress={(): undefined => undefined} />
)

const test3 = (
  <TouchableItem
    disabled={false}
    accessible
    accessibilityRole="button"
    accessibilityComponentType="button"
    accessibilityLabel="header"
    accessibilityTraits="button"
    testID="testId"
    delayPressIn={0}
    onPress={undefined}
    pressColor=""
    style={[{ width: 0 }, false && { height: 0 }]}
    borderless
  />
)
