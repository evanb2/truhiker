import firebase from 'firebase'
import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Button, TextInput, Title, TouchableRipple } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'

interface State {
  email: string
  password: string
}
export class AuthScreen extends Component<NavigationScreenProps, State> {
  state = {
    email: '',
    password: '',
  }

  handleEmail = (email: string): void => {
    this.setState({ email })
  }

  handlePassword = (password: string): void => {
    this.setState({ password })
  }

  /**
   * SignIn user using email/password.
   */
  signIn = (): void => {
    const { email, password } = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { navigation } = this.props

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
          <Title style={{ width: '100%', textAlign: 'center' }}>TruHiker</Title>
          <TextInput
            style={{ width: '100%', marginVertical: 4 }}
            mode={'outlined'}
            label={'Email'}
            value={this.state.email}
            onChangeText={this.handleEmail}
            keyboardType={'email-address'}
            autoCorrect={false}
            autoCapitalize={'none'}
          />
          <TextInput
            style={{ width: '100%', marginVertical: 4 }}
            mode={'outlined'}
            label={'Password'}
            value={this.state.password}
            onChangeText={this.handlePassword}
            autoCorrect={false}
            secureTextEntry={true}
          />
          <View style={{ marginVertical: 8 }}>
            <TouchableRipple
              style={{ width: 200, marginVertical: 8, borderRadius: 4 }}
              rippleColor={theme.colors.primary}
              onPress={this.signIn}
            >
              <Button mode={'contained'} uppercase={false}>
                Sign In
              </Button>
            </TouchableRipple>
          </View>
          <TouchableRipple
            style={{ position: 'absolute', bottom: 36, borderRadius: 4 }}
            onPress={() => navigation.navigate(Routes.Signup)}
            rippleColor={theme.colors.primary}
          >
            <Button uppercase={false}>Sign Up</Button>
          </TouchableRipple>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
