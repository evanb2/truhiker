import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import React, { PureComponent } from 'react'
import { Alert, Animated, StyleSheet, View } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Caption, Subheading, Surface, Text } from 'react-native-paper'
import { colors } from 'styles/colors'
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
        onPress={() => this.deleteAlert()}
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
    const { gearItem, onPress } = this.props
    const { name, description, weight, units, consumable, worn } = gearItem

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
        <Surface style={_styles.surface}>
          <TouchableOpacity
            style={_styles.touchable}
            hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
            onPress={() => onPress(gearItem)}
          >
            <View style={_styles.leftColumn}>
              <Subheading style={_styles.nameText}>{name}</Subheading>
              <Caption style={_styles.descriptionText}>{description}</Caption>
            </View>
            <View style={_styles.rightColumn}>
              <Text style={_styles.weightText}>{`${weight} ${units}`}</Text>
              {(worn || consumable) && (
                <View style={_styles.iconContainer}>
                  {worn && (
                    <AntDesign
                      name="skin"
                      size={20}
                      color={colors.lightGreen}
                    />
                  )}
                  {consumable && (
                    <MaterialCommunityIcons
                      name="silverware-variant"
                      size={20}
                      style={worn && { marginLeft: 8 }}
                      color={colors.lightGreen}
                    />
                  )}
                </View>
              )}
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
  surface: {
    flex: 1,
    elevation: 3,
    borderRadius: 10,
    padding: 16,
    margin: 8,
    backgroundColor: colors.gunmetalGrey,
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
  nameText: { color: 'white' },
  descriptionText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  weightText: { fontSize: 16, color: 'white', paddingRight: 8 },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
})
