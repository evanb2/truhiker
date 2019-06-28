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
import { theme } from 'styles/theme'

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
        created: firebase.firestore.Timestamp.now(),
      })

    navigation.navigate(Routes.AddGear, { packlistId: packlistRef.id })
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
        <View style={_styles.screenContainer}>
          <TextInput
            mode="outlined"
            autoFocus
            label="Name"
            style={_styles.inputs}
            value={name}
            onChangeText={this.handleNameChange}
          />
          <TextInput
            mode="outlined"
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
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  inputs: {
    marginBottom: 8,
  },
})
