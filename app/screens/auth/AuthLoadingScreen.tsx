import firebase from 'firebase/app'
import 'firebase/auth'
import Lottie from 'lottie-react-native'
import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from 'styles/theme'

export class AuthLoadingScreen extends Component<NavigationScreenProps> {
  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(user ? 'App' : 'Auth')
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
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'floralwhite',
        }}
      >
        <Lottie
          style={{ width: 250, height: 250 }}
          source={require('assets/animations/mountain-animation.json')}
          autoPlay
          loop={false}
          onAnimationFinish={this.bootstrapAsync}
        />
      </View>
    )
  }
}
