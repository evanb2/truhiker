import firebase from 'firebase'
import 'firebase/auth'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'

export class SettingsScreen extends Component<NavigationScreenProps> {
  logout = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button mode="contained" onPress={this.logout}>
          Logout
        </Button>
      </View>
    )
  }
}
