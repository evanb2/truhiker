import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'
import { GearItem, WeightUnits } from 'utils/types'

interface State {
  name: string
  description: string
  price: string
  weight: string
  units: WeightUnits
  quantity: number
  photoURL: string
  linkURL: string
  worn: boolean
  consumable: boolean
  errorFields: string[]
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
    units: WeightUnits.OUNCES,
    quantity: 0,
    photoURL: '',
    errorFields: [],
  }

  componentDidMount() {
    const { navigation } = this.props
    const { setParams, getParam } = navigation

    const gearItem: GearItem = getParam('gearItem')

    if (gearItem) {
      this.setState({
        name: gearItem.name,
        description: gearItem.description,
        price: gearItem.price,
        weight: gearItem.price,
        linkURL: gearItem.linkURL,
        worn: gearItem.worn,
        consumable: gearItem.consumable,
        units: gearItem.units,
        quantity: gearItem.quantity,
        photoURL: gearItem.photoURL,
      })
    }

    setParams({ rightAction: this.addGearItem })
  }

  addGearItem = () => {
    const { navigation } = this.props
    const { name } = this.state

    if (!name) {
      this.setState({ errorFields: ['name'] })
      return
    }

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
      errorFields,
    } = this.state

    return (
      <View style={_styles.screenContainer}>
        <TextInput
          autoFocus
          autoCapitalize="sentences"
          maxLength={40}
          style={_styles.textInputContainer}
          label="Name"
          error={errorFields.includes('name')}
          value={name}
          onChangeText={val => this.setState({ name: val })}
        />
        <TextInput
          autoCapitalize="sentences"
          maxLength={40}
          style={_styles.textInputContainer}
          label="Description"
          value={description}
          onChangeText={val => this.setState({ description: val })}
        />
        <View style={_styles.textInputRow}>
          <TextInput
            keyboardType="decimal-pad"
            maxLength={7}
            style={[_styles.textInputContainer, { flex: 1, marginRight: 4 }]}
            label="Price"
            value={price}
            onChangeText={val => this.setState({ price: val })}
          />
          <TextInput
            keyboardType="decimal-pad"
            maxLength={8}
            style={[_styles.textInputContainer, { flex: 1, marginLeft: 4 }]}
            label="Weight"
            value={weight}
            onChangeText={val => this.setState({ weight: val })}
          />
        </View>
        <TextInput
          keyboardType={Platform.OS === 'ios' ? 'url' : 'default'}
          autoCorrect={false}
          autoCapitalize="none"
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