import React, { Component } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import firebase from 'react-native-firebase'
import { NavigationScreenProps } from 'react-navigation'

export class AuthLoadingScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props)

    this.bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
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
