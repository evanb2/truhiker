import { SimpleLineIcons } from '@expo/vector-icons'
import { GearListItem } from 'components/GearListItem'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Surface, Text } from 'react-native-paper'
import { Category, PackItem, WeightUnit } from 'utils/types'

interface Props {
  category: Category
  onAddItems: (category: string) => void
  onDeleteCategory: (category: string) => void
  onPressItem: (packItem: PackItem) => void
  onRemoveItem: (packItem: PackItem) => void
}

export class CategoryTable extends Component<Props> {
  render() {
    const {
      category,
      onAddItems,
      onDeleteCategory,
      onPressItem,
      onRemoveItem,
    } = this.props

    const { name, packItems } = category

    const totalWeight = () => {
      if (packItems.length === 0) {
        return 0
      }
      return packItems
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
    }

    return (
      <Surface style={_styles.surface}>
        <View style={_styles.tableHeaderRow}>
          <Subheading style={{ fontWeight: 'bold', marginLeft: 2 }}>
            {name}
          </Subheading>
          <TouchableOpacity onPress={() => onAddItems(name)}>
            <SimpleLineIcons name="plus" size={20} />
          </TouchableOpacity>
        </View>
        {packItems.map((packItem: PackItem) => (
          <GearListItem
            key={packItem.uid}
            gearItem={packItem}
            onPress={onPressItem}
            onDelete={onRemoveItem}
          />
        ))}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <TouchableOpacity onPress={() => onDeleteCategory(name)}>
            <SimpleLineIcons name="trash" size={20} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 4 }}>
              {`${totalWeight()} lbs`}
            </Text>
          </View>
        </View>
      </Surface>
    )
  }
}

const _styles = StyleSheet.create({
  surface: {
    borderRadius: 10,
    elevation: 6,
    margin: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
