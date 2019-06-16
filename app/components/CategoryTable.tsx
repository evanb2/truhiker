import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Subheading, Surface, Text } from 'react-native-paper'
import { PackItem } from 'utils/types'

interface Props {
  categoryItems: PackItem[]
}

export class CategoryTable extends Component<Props> {
  render() {
    const { categoryItems } = this.props
    const category = categoryItems[0].category

    return (
      <Surface style={_styles.surface}>
        <Subheading>{category}</Subheading>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
