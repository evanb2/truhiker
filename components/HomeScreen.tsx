import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export class HomeScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    )
  }
}
