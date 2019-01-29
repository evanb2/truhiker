import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from '../styles/theme'

export class HomeScreen extends Component<NavigationScreenProps> {
  goToCreateListScreen = () => {
    this.props.navigation.navigate('CreateList')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Title>truHiker</Title>
        <Button mode={'contained'}>Create a list</Button>
        <Button mode={'outlined'} color={theme.colors.accent}>
          My Gear Closet
        </Button>
      </View>
    )
  }
}
