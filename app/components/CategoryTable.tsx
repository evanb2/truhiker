import { SimpleLineIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Subheading, Surface, Text } from 'react-native-paper'
import { theme } from 'styles/theme'
import { PackItem, WeightUnit } from 'utils/types'

interface Props {
  categoryName: string
  categoryItems: PackItem[]
  onAddItems: (category: string) => void
  onDeleteCategory: (category: string) => void
}

export class CategoryTable extends Component<Props> {
  render() {
    const {
      categoryName,
      categoryItems,
      onAddItems,
      onDeleteCategory,
    } = this.props

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
        <View style={_styles.tableHeaderRow}>
          <Subheading style={{ fontWeight: 'bold', marginLeft: 2 }}>
            {categoryName}
          </Subheading>
          <TouchableOpacity onPress={() => onAddItems(categoryName)}>
            <SimpleLineIcons name="plus" size={20} />
          </TouchableOpacity>
        </View>
        {categoryItems.map((packItem: PackItem) => (
          <View style={_styles.tableItemRow} key={packItem.uid}>
            <View style={{ flex: 1 }}>
              <Text>{packItem.name}</Text>
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
          <TouchableOpacity onPress={() => onDeleteCategory(categoryName)}>
            <SimpleLineIcons name="trash" size={20} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 4 }}>
              {`${totalWeight} lbs`}
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
    backgroundColor: 'lightgrey',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableItemRow: {
    marginVertical: 4,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: 'burlywood',
  },
})
