import { GearListItem } from 'components/GearListItem'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { IconButton, Searchbar, Title } from 'react-native-paper'
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
    gearRef: () => {},
  }

  componentDidMount() {
    this.attachGearCollectionListener()
  }

  componentWillUnmount() {
    const { gearRef } = this.state
    // detach firestore listener
    gearRef()
  }

  attachGearCollectionListener = () => {
    try {
      const user = firebase.auth().currentUser
      const gearRef = firebase
        .firestore()
        .collection('gearItems')
        .where('userId', '==', user && user.uid)
        .onSnapshot(querySnapshot => {
          const gearItems: firebase.firestore.DocumentData[] = []
          querySnapshot.forEach(doc =>
            gearItems.push({ uid: doc.id, ...doc.data() })
          )
          console.log(gearItems)
          this.setState({ gearItems })
        })
      this.setState({ gearRef })
    } catch (error) {
      console.log('fetch gear closet error: ', error)
    }
  }

  handleGearItemPress = (gearItem: GearItem) => {
    const { navigation } = this.props

    navigation.navigate(Routes.GearItem, { gearItem })
  }

  handleGearItemDelete = (gearItem: GearItem) => {
    try {
      firebase
        .firestore()
        .collection('gearItems')
        .doc(gearItem.uid)
        .delete()
    } catch (error) {
      console.log(error)
    }
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
          style={{ marginHorizontal: 16, marginBottom: 8 }}
          placeholder="Search"
          value={searchQuery}
          onChangeText={query => this.setState({ searchQuery: query })}
        />
        <FlatList
          data={gearItems}
          renderItem={({ item }) => (
            <GearListItem
              gearItem={item}
              onPress={this.handleGearItemPress}
              onDelete={this.handleGearItemDelete}
            />
          )}
          keyExtractor={item => String(item.name)}
          contentContainerStyle={{ paddingTop: 8 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </SafeAreaView>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
})
