import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Routes } from 'routes'
import { theme } from 'styles/theme'

enum Units {
  OUNCE = 'oz',
  POUND = 'lb',
  GRAM = 'g',
}

interface State {
  name: string
  description: string
  price: string
  weight: string
  units: Units
  quantity: number
  photoURL: string
  linkURL: string
  worn: boolean
  consumable: boolean
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class GearItemScreen extends Component<Props, State> {
  state = {
    name: '',
    description: '',
    price: '',
    weight: '',
    linkURL: '',
    worn: false,
    consumable: false,
    units: Units.OUNCE,
    quantity: 0,
    photoURL: '',
  }

  componentDidMount() {
    const { navigation } = this.props
    const { setParams } = navigation

    setParams({ rightAction: this.addGearItem })
  }

  addGearItem = () => {
    const { navigation } = this.props
    try {
      firebase
        .firestore()
        .collection('gear')
        .add({
          ...this.state,
        })
      navigation.navigate(Routes.GearCloset)
    } catch (error) {
      console.dir(error)
    }
  }

  toggleWorn = () => {
    this.setState((state: State) => ({
      worn: !state.worn,
    }))
  }

  toggleConsumable = () => {
    this.setState((state: State) => ({
      consumable: !state.consumable,
    }))
  }

  render() {
    const {
      name,
      description,
      price,
      weight,
      linkURL,
      worn,
      consumable,
    } = this.state

    return (
      <View style={_styles.screenContainer}>
        <TextInput
          style={_styles.textInputContainer}
          label="Name"
          value={name}
          onChangeText={val => this.setState({ name: val })}
        />
        <TextInput
          style={_styles.textInputContainer}
          label="Description"
          value={description}
          onChangeText={val => this.setState({ description: val })}
        />
        <View style={_styles.textInputRow}>
          <TextInput
            style={[_styles.textInputContainer, { flex: 1, marginRight: 4 }]}
            label="Price"
            value={price}
            onChangeText={val => this.setState({ price: val })}
          />
          <TextInput
            style={[_styles.textInputContainer, { flex: 1, marginLeft: 4 }]}
            label="Weight"
            value={weight}
            onChangeText={val => this.setState({ weight: val })}
          />
        </View>
        <TextInput
          style={_styles.textInputContainer}
          label="Link"
          value={linkURL}
          onChangeText={val => this.setState({ linkURL: val })}
        />
        <View style={_styles.buttonsRow}>
          <TouchableOpacity onPress={this.toggleWorn} style={_styles.button}>
            <AntDesign
              name="skin"
              size={35}
              color={worn ? theme.colors.primary : theme.colors.disabled}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleConsumable}
            style={_styles.button}
          >
            <MaterialCommunityIcons
              name="silverware-variant"
              size={35}
              color={consumable ? theme.colors.primary : theme.colors.disabled}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textInputContainer: { marginVertical: 4 },
  textInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 16,
  },
})
