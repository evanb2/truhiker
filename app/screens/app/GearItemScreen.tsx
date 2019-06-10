import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { WeightUnitSelector } from 'components/WeightUnitSelector'
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
  uid: string
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
    uid: '',
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
    errorFields: [''],
  }

  componentWillMount() {
    const { navigation } = this.props
    const { setParams, getParam } = navigation

    const gearItem: GearItem = getParam('gearItem')

    setParams({ rightAction: this.addGearItem })

    if (gearItem) {
      setParams({ rightAction: this.updateGearItem })
      this.setState({
        uid: gearItem.uid,
        name: gearItem.name,
        description: gearItem.description,
        price: gearItem.price,
        weight: gearItem.weight,
        linkURL: gearItem.linkURL,
        worn: gearItem.worn,
        consumable: gearItem.consumable,
        units: gearItem.units,
        quantity: gearItem.quantity,
        photoURL: gearItem.photoURL,
      })
    }
  }

  addGearItem = () => {
    const { navigation } = this.props
    const {
      name,
      description,
      price,
      weight,
      linkURL,
      worn,
      consumable,
      units,
      quantity,
      photoURL,
    } = this.state

    if (!name) {
      this.setState({ errorFields: ['name'] })
      return
    }

    try {
      const user = firebase.auth().currentUser
      firebase
        .firestore()
        .collection('gear')
        .add({
          name,
          description,
          price,
          weight,
          linkURL,
          worn,
          consumable,
          units,
          quantity,
          photoURL,
          userId: user && user.uid,
        })
      navigation.navigate(Routes.GearCloset)
    } catch (error) {
      console.dir(error)
    }
  }

  updateGearItem = () => {
    const { navigation } = this.props
    const {
      uid,
      name,
      description,
      price,
      weight,
      linkURL,
      worn,
      consumable,
      units,
      quantity,
      photoURL,
    } = this.state

    if (!name) {
      this.setState({ errorFields: ['name'] })
      return
    }

    try {
      firebase
        .firestore()
        .collection('gear')
        .doc(uid)
        .update({
          name,
          description,
          price,
          weight,
          linkURL,
          worn,
          consumable,
          units,
          quantity,
          photoURL,
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

  handleUnitSelect = (units: WeightUnits) => {
    this.setState({ units })
  }

  render() {
    const {
      name,
      description,
      price,
      weight,
      units,
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
        <TextInput
          keyboardType={Platform.OS === 'ios' ? 'url' : 'default'}
          autoCorrect={false}
          autoCapitalize="none"
          style={_styles.textInputContainer}
          label="Link"
          value={linkURL}
          onChangeText={val => this.setState({ linkURL: val })}
        />
        <View style={_styles.textInputRow}>
          <TextInput
            keyboardType="decimal-pad"
            maxLength={7}
            style={[_styles.textInputContainer, { flex: 1, marginRight: 4 }]}
            label="$"
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
          <View style={{ flex: 1 }}>
            <WeightUnitSelector
              onValueChange={this.handleUnitSelect}
              initialValue={units}
            />
          </View>
        </View>
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
