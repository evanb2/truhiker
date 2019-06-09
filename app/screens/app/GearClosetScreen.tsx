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
  items: ListItem[]
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class GearClosetScreen extends Component<Props> {
  state = {
    gearItems: [],
  }

  componentDidMount() {
    this.loadGear()
  }

  loadGear = async () => {
    try {
      // const gear = await firebase
      //   .firestore()
      //   .collection('gear')
      //   .onSnapshot(res => {
      //     console.dir(res)
      //   })
      firebase
        .firestore()
        .collection('gear')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.setState({ gearItems: doc.data() })
            console.log(doc.id, ' => ', doc.data())
          })
        })
      // console.log('gear', ' => ', gear)
    } catch (error) {
      console.log('fetch gear closet error: ', error)
    }
  }

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
          data={[]}
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
