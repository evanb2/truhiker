import firebase from 'firebase'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from 'styles/theme'

export default class SignupScreen extends Component<NavigationScreenProps> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  /**
   * Register new user using email/password.
   */
  signUp = (): void => {
    const { email, password } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { email, password, confirmPassword } = this.state

    const disabled =
      !password || !confirmPassword || password !== confirmPassword

    return (
      <View style={_styles.screenContainer}>
        <TextInput
          autoFocus
          style={{ width: '100%', marginVertical: 4 }}
          mode={'outlined'}
          label={'Email'}
          value={email}
          onChangeText={val => this.setState({ email: val })}
          keyboardType={'email-address'}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4 }}
          mode={'outlined'}
          label={'Password'}
          value={password}
          onChangeText={val => this.setState({ password: val })}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4 }}
          mode={'outlined'}
          label={'Confirm Password'}
          value={confirmPassword}
          onChangeText={val => this.setState({ confirmPassword: val })}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          uppercase={false}
          style={{ marginTop: 8 }}
          disabled={disabled}
          onPress={this.signUp}
        >
          Signup
        </Button>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.backdrop,
  },
})
