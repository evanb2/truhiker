import React, { Component } from 'react'
import { View } from 'react-native'
import {
  Button,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from '../styles/theme'

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
        <TouchableRipple
          rippleColor={theme.colors.primary}
          onPress={() => console.log('sign up')}
        >
          <Button mode="contained">Sign Up</Button>
        </TouchableRipple>
      </View>
    )
  }
}
