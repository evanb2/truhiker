import { FontAwesome5 } from '@expo/vector-icons'
import * as firebase from 'firebase'
import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { Button, TextInput, Title, TouchableRipple } from 'react-native-paper'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { colors } from 'styles/colors'
import { theme } from 'styles/theme'
import googleSignin from 'utils/googleSignin'

interface State {
  email: string
  password: string
}
export class AuthScreen extends Component<NavigationScreenProps, State> {
  static navigationOptions: NavigationScreenOptions = {
    header: null,
  }

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
   * Register new user using email/password.
   */
  signUp = (): void => {
    const { email, password } = this.state
    const { navigation } = this.props
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Register')
      })
      .catch(error => {
        console.log(error)
      })
  }

  /**
   * SignIn user using email/password.
   */
  signIn = (): void => {
    const { email, password } = this.state
    const { navigation } = this.props
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home')
      })
      .catch(error => {
        console.log(error)
      })
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
              <Button mode={'contained'}>Sign In</Button>
            </TouchableRipple>
            <TouchableRipple
              style={{ width: 200, marginVertical: 8, borderRadius: 4 }}
              rippleColor={colors.googleRed}
              onPress={googleSignin}
            >
              <Button
                color={colors.googleRed}
                mode={'outlined'}
                style={{ backgroundColor: 'white' }}
                icon={() => (
                  <FontAwesome5
                    color={colors.googleRed}
                    name={'google'}
                    solid
                  />
                )}
              >
                Google
              </Button>
            </TouchableRipple>
          </View>
          <TouchableRipple
            style={{ position: 'absolute', bottom: 36, borderRadius: 4 }}
            onPress={this.signUp}
            rippleColor={theme.colors.primary}
          >
            <Button>Sign Up</Button>
          </TouchableRipple>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
