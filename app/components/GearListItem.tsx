import { SimpleLineIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import React, { PureComponent } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Caption, Subheading, Surface, Text } from 'react-native-paper'
import { theme } from 'styles/theme'
import { GearItem, PackItem } from 'utils/types'

const AnimatedIcon = Animated.createAnimatedComponent(SimpleLineIcons)

interface Props {
  gearItem: GearItem
  onPress: (gearItem: GearItem) => void
  onDelete?: (gearItem: GearItem | PackItem) => void
}

export class GearListItem extends PureComponent<Props> {
  // SwipeableRow: React.RefObject<Swipeable> = React.createRef()
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
  deleteAction = () => {
    const { gearItem, onDelete } = this.props
    if (onDelete) {
      onDelete(gearItem)
      this.close()
    }
  }

  triggerWarning = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
  }

  triggerImpactMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  renderRightActions = (
    _progress: Animated.Value | Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    return (
      <RectButton
        style={_styles.rightAction}
        onPress={() => this.deleteAction()}
      >
        <AnimatedIcon
          name="trash"
          size={25}
          color={theme.colors.error}
          style={[_styles.deleteIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    )
  }

  render() {
    const { gearItem, onPress, onDelete } = this.props
    const { name, description, weight, units } = gearItem

    return (
      <Swipeable
        ref={ref => {
          this.SwipeableRow = ref
        }}
        renderRightActions={onDelete && this.renderRightActions}
        onSwipeableRightWillOpen={this.triggerWarning}
        onSwipeableClose={this.triggerImpactMedium}
        friction={2}
      >
        <Surface style={_styles.surface}>
          <LinearGradient
            colors={['#fff', '#fff']}
            style={{
              borderRadius: 10,
              width: '100%',
              height: '100%',
              padding: 16,
            }}
          >
            <TouchableOpacity
              style={_styles.touchable}
              hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
              onPress={() => onPress(gearItem)}
            >
              <View style={_styles.leftColumn}>
                <Subheading>{name}</Subheading>
                <Caption style={_styles.descriptionText}>{description}</Caption>
              </View>
              <View style={_styles.rightColumn}>
                <Text style={_styles.weightText}>{`${weight} ${units}`}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
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
  surface: {
    flex: 1,
    elevation: 2,
    margin: 8,
    borderRadius: 10,
  },
  touchable: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColumn: { flex: 2 },
  rightColumn: {
    flex: 0.8,
    alignItems: 'flex-end',
  },
  descriptionText: { fontSize: 14 },
  weightText: { fontSize: 16, paddingRight: 8 },
})
