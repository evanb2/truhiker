import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { IconButton, List, Title } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Routes } from 'screens/routes'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class MyGearListsScreen extends Component<Props> {
  state = {
    packlists: null,
    packlistsRef: () => {},
  }

  componentWillMount() {
    this.attachPacklistsListener()
  }

  componentWillUnmount() {
    const { packlistsRef } = this.state
    // detach firestore listener
    packlistsRef()
  }

  attachPacklistsListener = () => {
    const user = firebase.auth().currentUser
    const packlistsRef = firebase
      .firestore()
      .collection('packlists')
      .where('userId', '==', user && user.uid)
      .onSnapshot(querySnapshot => {
        const packlists: firebase.firestore.DocumentData[] = []
        querySnapshot.forEach(doc =>
          packlists.push({ uid: doc.id, ...doc.data() })
        )
        this.setState({ packlists })
      })
    this.setState({ packlistsRef })
  }

  _renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.description}
      descriptionEllipsizeMode="tail"
      right={props => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => console.log(item.name)}
    />
  )

  render() {
    const { navigation } = this.props
    const { packlists } = this.state

    return (
      <SafeAreaView style={_styles.screenContainer}>
        <View style={_styles.headerRow}>
          <Title>My Gear Lists</Title>
          <IconButton
            icon="add"
            onPress={() => navigation.navigate(Routes.CreateList)}
          />
        </View>
        <FlatList
          data={packlists}
          renderItem={this._renderItem}
          keyExtractor={item => item.uid}
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
