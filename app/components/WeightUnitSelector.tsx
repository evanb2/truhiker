import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from 'styles/theme'
import { WeightUnits } from 'utils/types'

interface Props {
  onValueChange: (val: WeightUnits) => void
  initialValue?: WeightUnits
}

interface State {
  index: number
  units: WeightUnits[]
}

export class WeightUnitSelector extends Component<Props, State> {
  state = {
    index: 0,
    units: [
      WeightUnits.GRAMS,
      WeightUnits.KILOGRAMS,
      WeightUnits.OUNCES,
      WeightUnits.POUNDS,
    ],
  }

  componentDidMount() {
    const { initialValue } = this.props
    const { units } = this.state

    if (initialValue) {
      this.setState({ index: units.indexOf(initialValue) })
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { index, units } = this.state
    const { onValueChange } = this.props
    if (index !== prevState.index) {
      onValueChange(units[index])
    }
  }

  decrementWeightUnit = () => {
    this.setState(state => ({
      index: state.index - 1,
    }))
  }

  incrementWeightUnit = () => {
    this.setState(state => ({
      index: state.index + 1,
    }))
  }

  render() {
    const { index, units } = this.state

    const unitsIcon = () => {
      let iconName
      switch (units[index]) {
        case WeightUnits.GRAMS:
          iconName = 'gram'
          break
        case WeightUnits.KILOGRAMS:
          iconName = 'kilogram'
          break
        case WeightUnits.POUNDS:
          iconName = 'pound'
          break
        case WeightUnits.OUNCES:
          return (
            <View style={{ backgroundColor: 'black', borderRadius: 10 }}>
              <Text style={{ fontWeight: 'bold', color: 'white', padding: 4 }}>
                OZ
              </Text>
            </View>
          )
        default:
          iconName = 'pound'
          break
      }

      return <MaterialCommunityIcons name={`weight-${iconName}`} size={30} />
    }

    return (
      <View style={_styles.container}>
        <TouchableOpacity
          onPress={this.decrementWeightUnit}
          disabled={index === 0}
          hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
        >
          <SimpleLineIcons
            name="arrow-left"
            size={20}
            color={index === 0 ? theme.colors.disabled : theme.colors.primary}
          />
        </TouchableOpacity>
        {unitsIcon()}
        <TouchableOpacity
          onPress={this.incrementWeightUnit}
          disabled={index === units.length - 1}
          hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
        >
          <SimpleLineIcons
            name="arrow-right"
            size={20}
            color={
              index === units.length - 1
                ? theme.colors.disabled
                : theme.colors.primary
            }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})
