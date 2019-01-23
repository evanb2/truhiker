import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput, Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'

interface State {
  email: string
  password: string
}
export class AuthScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmail = (email: string) => {
    this.setState({ email })
  }

  handlePassword = (password: string) => {
    this.setState({ password })
  }

  render() {
    return (
      <View>
        <Title>truHiker</Title>
        <TextInput
          mode="outlined"
          label="Email"
          value={this.state.email}
          onChangeText={this.handleEmail}
          keyboardType="email-address"
          autoCorrect={false}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={this.state.password}
          onChangeText={this.handlePassword}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button mode="contained">Sign Up</Button>
      </View>
    )
  }
}
