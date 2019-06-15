import { SimpleLineIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import React, { PureComponent } from 'react'
import { Alert, Animated, StyleSheet, View } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Caption, Headline, Surface, Text } from 'react-native-paper'
import { theme } from 'styles/theme'
import { GearItem } from 'utils/types'

const AnimatedIcon = Animated.createAnimatedComponent(SimpleLineIcons)

interface Props {
  gearItem: GearItem
  onPress: (gearItem: GearItem) => void
  onDelete: (gearItem: GearItem) => void
}

export class GearListItem extends PureComponent<Props> {
  /**
   * Animate row back to closed, hides delete button.
   * @returns {void}
   */
  close = () => this.SwipeableRow.close()

  /**
   * Opens Alert dialog to confirm delete.
   * @param {object} measurement The measurement to delete
   * @returns {void}
   */
  deleteAlert = () => {
    const { gearItem, onDelete } = this.props

    Alert.alert('Delete Gear', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        onPress: this.close,
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => onDelete(gearItem),
        style: 'destructive',
      },
    ])
  }

  triggerWarning = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
  }

  triggerImpactMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
    return (
      <RectButton
        style={_styles.rightAction}
        onPress={() => this.deleteAlert()}
      >
        <AnimatedIcon
          name="trash"
          size={30}
          color={theme.colors.error}
          style={[_styles.deleteIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    )
  }

  render() {
    const { gearItem, onPress } = this.props

    return (
      <Swipeable
        ref={ref => {
          this.SwipeableRow = ref
        }}
        renderRightActions={this.renderRightActions}
        onSwipeableRightWillOpen={this.triggerWarning}
        onSwipeableClose={this.triggerImpactMedium}
        friction={2}
      >
        <Surface
          style={{
            flex: 1,
            elevation: 3,
            borderRadius: 10,
            padding: 16,
            margin: 8,
          }}
        >
          <TouchableOpacity
            style={{ width: '100%' }}
            hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
            onPress={() => onPress(gearItem)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
                <Headline>{gearItem.name}</Headline>
                <Caption style={{ fontSize: 16 }}>
              <View style={{ flex: 2 }}>
                  {gearItem.description}
                </Caption>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16 }}>
                  {`${gearItem.weight} ${gearItem.units}`}
                </Text>
                <Caption style={{ fontSize: 16 }}>{`$${
                  gearItem.price
                }`}</Caption>
              </View>
            </View>
          </TouchableOpacity>
        </Surface>
      </Swipeable>
    )
  }
}

const _styles = StyleSheet.create({
  rightAction: {
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 30,
  },
})
