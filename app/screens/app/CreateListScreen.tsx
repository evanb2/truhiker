import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { Routes } from 'screens/routes'

interface State {
  name: string
  description: string
}

export class CreateListScreen extends Component<NavigationScreenProps, State> {
  state = {
    name: '',
    description: '',
  }

  componentWillMount() {
    const { navigation } = this.props
    const { setParams } = navigation

    setParams({ rightAction: this.createNewList, rightText: 'Next' })
  }

  createNewList = async () => {
    const { navigation } = this.props
    const { name, description } = this.state
    const user = firebase.auth().currentUser

    const packlistRef = await firebase
      .firestore()
      .collection('packlists')
      .add({
        name,
        description,
        userId: user && user.uid,
      })

    navigation.navigate(Routes.AddGear, { packlistRef })
  }

  handleNameChange = (name: string) => {
    this.setState({ name })
  }

  handleDescriptionChange = (description: string) => {
    this.setState({ description })
  }

  render() {
    const { name, description } = this.state

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, margin: 16 }}>
          <TextInput
            label="Name"
            style={_styles.inputs}
            value={name}
            onChangeText={this.handleNameChange}
          />
          <TextInput
            multiline
            numberOfLines={10}
            label="Description"
            style={{
              height: 200,
            }}
            value={description}
            onChangeText={this.handleDescriptionChange}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const _styles = StyleSheet.create({
  inputs: {
    marginBottom: 8,
  },
})
