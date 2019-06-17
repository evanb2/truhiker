import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { IconButton, List, Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'

export class MyGearListsScreen extends Component<NavigationScreenProps> {
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
      .onSnapshot(
        snapshot => {
          const packlists: firebase.firestore.DocumentData[] = []
          snapshot.forEach(doc =>
            packlists.push({ uid: doc.id, ...doc.data() })
          )
          this.setState({ packlists })
        },
        error => console.log(error)
      )
    this.setState({ packlistsRef })
  }

  _renderItem = ({ item }) => {
    const { navigation } = this.props
    return (
      <List.Item
        title={item.name}
        description={item.description}
        descriptionEllipsizeMode="tail"
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() =>
          navigation.navigate(Routes.AddGear, { packlistId: item.uid })
        }
      />
    )
  }

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
    backgroundColor: theme.colors.backdrop,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
})
