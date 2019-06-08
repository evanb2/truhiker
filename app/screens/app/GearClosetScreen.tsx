import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { IconButton, List, Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'

enum Units {
  OUNCE = 'oz',
  POUND = 'lb',
  GRAM = 'g',
}

interface ListItem {
  name: string
  description: string
  price: string
  weight: number
  units: Units
  quantity: number
  photoUrl: string
  linkUrl: string
  worn: boolean
  consumable: boolean
  // category,
  // belongsToLists,
  // user/owner
}

interface Props {
  navigation: { navigate: (routeName: string) => any }
  items: ListItem[]
}

export class GearClosetScreen extends Component<Props> {
  _renderItem = ({ item }: { item: ListItem }) => {
    return (
      <Swipeable>
        <List.Item
          title={item.name}
          titleEllipsizeMode="tail"
          onPress={() => console.log('tapped: ', item.name)}
        />
      </Swipeable>
    )
  }

  render() {
    const { navigation } = this.props

    return (
      <SafeAreaView style={_styles.screenContainer}>
        <Title>My Gear Closet</Title>
        <IconButton
          style={_styles.addItemButton}
          icon="add"
          onPress={() => navigation.navigate('ItemForm')}
        />
        {/* SEARCH INPUT HERE */}
        <FlatList
          data={[{ id: 'ahdua62hd7', name: 'Test' }]}
          renderItem={this._renderItem}
          keyExtractor={item => String(item.id)}
        />
      </SafeAreaView>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: 'white', marginHorizontal: 16 },
  addItemButton: {
    position: 'absolute',
    top: 16,
    right: 8,
  },
})
