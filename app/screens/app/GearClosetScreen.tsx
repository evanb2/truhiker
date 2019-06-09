import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { IconButton, List, Title, Searchbar } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Routes } from 'screens/routes'
import { GearItem } from 'utils/types'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  items: GearItem[]
}

export class GearClosetScreen extends Component<Props> {
  state = {
    gearItems: [],
    searchQuery: '',
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
          const gearItems: firebase.firestore.DocumentData[] = []
          querySnapshot.forEach(doc => gearItems.push(doc.data()))
          console.log(gearItems)
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
    const { gearItems, searchQuery } = this.state

    return (
      <SafeAreaView style={_styles.screenContainer}>
        <View style={_styles.headerRow}>
          <Title>My Gear Closet</Title>
          <IconButton
            icon="add"
            onPress={() => navigation.navigate(Routes.GearItem)}
          />
        </View>
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={query => this.setState({ searchQuery: query })}
        />
        {/* SEARCH INPUT HERE */}
        <FlatList
          data={gearItems}
          renderItem={this._renderItem}
          keyExtractor={item => String(item.name)}
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
