import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import {
  Button,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { theme } from '../styles/theme'

interface State {
  email: string
  password: string
}
export class AuthScreen extends Component<NavigationScreenProps, State> {
  static navigationOptions: NavigationScreenOptions = {
    header: null,
  }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8,
          }}
        >
          <Title style={{ width: '100%', textAlign: 'center' }}>truHiker</Title>
          <TextInput
            style={{ width: '100%' }}
            mode="outlined"
            label="Email"
            value={this.state.email}
            onChangeText={this.handleEmail}
            keyboardType="email-address"
            autoCorrect={false}
          />
          <TextInput
            style={{ width: '100%' }}
            mode="outlined"
            label="Password"
            value={this.state.password}
            onChangeText={this.handlePassword}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <TouchableRipple
            style={{ width: '100%' }}
            rippleColor={theme.colors.primary}
            onPress={() => console.log('sign up')}
          >
            <Button mode="contained">Sign Up</Button>
          </TouchableRipple>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
