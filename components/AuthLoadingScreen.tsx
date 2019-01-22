import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'

interface Props {
  navigation: object;
}
export class AuthLoadingScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(user ? 'App' : 'Auth')
        console.log(user)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      // @TODO replace this (copied from react-navigation docs)
      <View
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  //
})
