import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { IconButton, List, Title } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

enum Units {
  OUNCE = 'oz',
  POUND = 'lb',
  GRAM = 'g',
}

interface GearItem {
  name: string
  description: string
  price: string
  weight: string
  units: Units
  quantity: number
  photoURL: string
  linkURL: string
  worn: boolean
  consumable: boolean
  // category,
  // belongsToLists,
  // user/owner
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  items: GearItem[]
}

export class GearClosetScreen extends Component<Props> {
  state = {
    gearItems: [],
  }

  componentDidMount() {
    this.attachGearCollectionListener()
  }

  attachGearCollectionListener = () => {
    try {
      firebase
        .firestore()
        .collection('gear')
        .onSnapshot(querySnapshot => {
          const gearItems: GearItem[] = []
          querySnapshot.forEach(doc => gearItems.push(doc.data()))
          this.setState({ gearItems })
        })
    } catch (error) {
      console.log('fetch gear closet error: ', error)
    }
  }

  _renderItem = ({ item }: { item: GearItem }) => {
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
    const { gearItems } = this.state

    return (
      <SafeAreaView style={_styles.screenContainer}>
        <View style={_styles.headerRow}>
          <Title>My Gear Closet</Title>
          <IconButton
            icon="add"
            onPress={() => navigation.navigate('ItemForm')}
          />
        </View>
        {/* SEARCH INPUT HERE */}
        <FlatList
          data={gearItems}
          renderItem={this._renderItem}
          keyExtractor={item => String(item.id)}
        />
      </SafeAreaView>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: 'white', marginHorizontal: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
