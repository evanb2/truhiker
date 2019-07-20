import { SimpleLineIcons } from '@expo/vector-icons'
import { GearListItem } from 'components/GearListItem'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Surface, Text } from 'react-native-paper'
import { Category, PackItem, WeightUnit } from 'utils/types'

interface Props {
  category: Category
  categoryItems: PackItem[]
  onAddItems: (category: Category) => void
  onDeleteCategory: (category: Category) => void
  onPressItem: (packItem: PackItem) => void
  onRemovePackItem: (packItem: PackItem) => void
}

export function CategoryTable(props: Props) {
  const {
    category,
    categoryItems,
    onAddItems,
    onDeleteCategory,
    onPressItem,
    onRemovePackItem,
  } = props

  const { name } = category

  const totalWeight = () => {
    if (categoryItems.length === 0) {
      return 0
    }
    return categoryItems
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
        <TouchableOpacity onPress={() => onAddItems(category)}>
          <SimpleLineIcons name="plus" size={20} />
        </TouchableOpacity>
      </View>
      {categoryItems.length > 0 ? (
        categoryItems.map((packItem: PackItem) => (
          <GearListItem<PackItem>
            key={packItem.uid}
            gearItem={packItem}
            onPress={() => onPressItem(packItem)}
            onDelete={() => onRemovePackItem(packItem)}
          />
        ))
      ) : (
        <Subheading style={{ textAlign: 'center' }}>No Items</Subheading>
      )}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
      >
        <TouchableOpacity onPress={() => onDeleteCategory(category)}>
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
