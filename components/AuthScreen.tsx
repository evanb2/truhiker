import React, { Component } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import firebase from 'react-native-firebase'
import {
  Button,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { theme } from '../styles/theme'
import googleSignin from '../utils/googleSignin'

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

  signin = () => {
    const { email, password } = this.state
    const { navigation } = this.props
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
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
          <TouchableRipple
            style={{ width: '100%' }}
            rippleColor={theme.colors.primary}
            onPress={googleSignin}
          >
            <Button
              mode="outlined"
              icon={() => <FontAwesome5 name={'google'} solid />}
            >
              Google
            </Button>
          </TouchableRipple>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
