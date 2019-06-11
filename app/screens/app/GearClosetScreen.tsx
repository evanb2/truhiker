import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {
  Caption,
  Headline,
  IconButton,
  Searchbar,
  Surface,
  Text,
  Title,
} from 'react-native-paper'
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
      const user = firebase.auth().currentUser
      firebase
        .firestore()
        .collection('gear')
        .where('userId', '==', user && user.uid)
        .onSnapshot(querySnapshot => {
          const gearItems: firebase.firestore.DocumentData[] = []
          querySnapshot.forEach(doc =>
            gearItems.push({ uid: doc.id, ...doc.data() })
          )
          console.log(gearItems)
          this.setState({ gearItems })
        })
    } catch (error) {
      console.log('fetch gear closet error: ', error)
    }
  }

  _renderItem = ({ item }: { item: GearItem }) => {
    const { navigation } = this.props

    return (
      <Swipeable>
        <Surface
          style={{
            flex: 1,
            elevation: 3,
            borderRadius: 10,
            padding: 16,
            margin: 8,
          }}
        >
          <TouchableOpacity
            style={{ width: '100%' }}
            hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
            onPress={() =>
              navigation.navigate(Routes.GearItem, { gearItem: item })
            }
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Headline>{item.name}</Headline>
                <Caption style={{ fontSize: 16 }}>{item.description}</Caption>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16 }}>
                  {`${item.weight} ${item.units}`}
                </Text>
                <Caption style={{ fontSize: 16 }}>{`$${item.price}`}</Caption>
              </View>
            </View>
          </TouchableOpacity>
        </Surface>
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
          contentContainerStyle={{ paddingTop: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
