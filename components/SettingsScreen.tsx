import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NavigationScreenProps } from 'react-navigation'

export class SettingsScreen extends Component<NavigationScreenProps> {
  static navigationOptions = {
    tabBarIcon: () => <FontAwesome5 name={'cog'} solid />,
  }
  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    )
  }
}
