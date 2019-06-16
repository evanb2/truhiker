import { SimpleLineIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Surface, Text } from 'react-native-paper'
import { PackItem, WeightUnit } from 'utils/types'

interface Props {
  categoryName: string
  categoryItems: PackItem[]
  onAddItems: (category: string) => void
}

export class CategoryTable extends Component<Props> {
  render() {
    const { categoryName, categoryItems, onAddItems } = this.props

    const totalWeight = categoryItems
      .map(item => {
        const weight = Number(item.weight)
        if (item.units === WeightUnit.GRAMS) {
          return weight / 453.592
        }
        if (item.units === WeightUnit.KILOGRAMS) {
          return weight * 2.205
        }
        if (item.units === WeightUnit.OUNCES) {
          return weight / 16
        }
        return weight
      })
      .reduce((prevVal, current) => prevVal + current)
      .toFixed(2)

    return (
      <Surface style={_styles.surface}>
        <Subheading style={{ fontWeight: 'bold' }}>{categoryName}</Subheading>
        {categoryItems.map((packItem: PackItem) => (
          <View style={_styles.tableItemRow} key={packItem.uid}>
            <View style={{ flex: 0.5 }}>
              <Text>{packItem.name}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{packItem.description}</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Text>{`${packItem.weight} ${packItem.units}`}</Text>
            </View>
          </View>
        ))}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <View style={{ flex: 0.2 }}>
            <TouchableOpacity
              style={_styles.addItemButton}
              onPress={() => onAddItems(categoryName)}
            >
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold' }}>{`${totalWeight} lbs`}</Text>
          </View>
        </View>
      </Surface>
    )
  }
}

const _styles = StyleSheet.create({
  surface: {
    borderRadius: 10,
    elevation: 4,
    margin: 8,
    padding: 8,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tableItemRow: {
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  // addItemButton: { marginTop: 8 },
})
