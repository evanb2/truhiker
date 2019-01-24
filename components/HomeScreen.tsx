import React, { Component } from 'react'
import { View } from 'react-native'
import { Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'

export class HomeScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Title>Home</Title>
      </View>
    )
  }
}
