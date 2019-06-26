import { WeightUnitelector } from 'components/WeightUnitSelector'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'
import { GearItem, WeightUnit } from 'utils/types'

interface State {
  uid: string
  name: string
  description: string
  price: string
  weight: string
  units: WeightUnit
  photoURL: string
  linkURL: string
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
    units: WeightUnit.OUNCES,
    photoURL: '',
    errorFields: [] as string[],
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
        units: gearItem.units,
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
      units,
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
        .collection('gearItems')
        .add({
          name,
          description,
          price,
          weight,
          linkURL,
          units,
          photoURL,
          userId: user && user.uid,
          created: firebase.firestore.Timestamp.now(),
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
      units,
      photoURL,
    } = this.state

    if (!name) {
      this.setState({ errorFields: ['name'] })
      return
    }

    try {
      firebase
        .firestore()
        .collection('gearItems')
        .doc(uid)
        .update({
          name,
          description,
          price,
          weight,
          linkURL,
          units,
          photoURL,
          updated: firebase.firestore.Timestamp.now(),
        })
      navigation.navigate(Routes.GearCloset)
    } catch (error) {
      console.dir(error)
    }
  }

  handleUnitSelect = (units: WeightUnit) => {
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
      errorFields,
    } = this.state

    return (
      <View style={_styles.screenContainer}>
        <TextInput
          mode="outlined"
          autoFocus
          autoCapitalize="sentences"
          maxLength={40}
          style={_styles.textInputContainer}
          label="Name"
          error={errorFields.includes('name')}
          value={name}
          onChangeText={val => this.setState({ name: val })}
          returnKeyType="next"
          onSubmitEditing={() => this.DescriptionInput.focus()}
        />
        <TextInput
          ref={ref => {
            this.DescriptionInput = ref
          }}
          mode="outlined"
          autoCapitalize="sentences"
          autoCorrect={false}
          maxLength={40}
          style={_styles.textInputContainer}
          label="Description"
          value={description}
          onChangeText={val => this.setState({ description: val })}
          returnKeyType="next"
          onSubmitEditing={() => this.LinkInput.focus()}
        />
        <TextInput
          ref={ref => {
            this.LinkInput = ref
          }}
          mode="outlined"
          keyboardType={Platform.OS === 'ios' ? 'url' : 'default'}
          autoCorrect={false}
          autoCapitalize="none"
          style={_styles.textInputContainer}
          label="Link"
          value={linkURL}
          onChangeText={val => this.setState({ linkURL: val })}
          returnKeyType="next"
          onSubmitEditing={() => this.PriceInput.focus()}
        />
        <View style={_styles.textInputRow}>
          <TextInput
            ref={ref => {
              this.PriceInput = ref
            }}
            mode="outlined"
            keyboardType="decimal-pad"
            maxLength={7}
            style={[_styles.textInputContainer, { flex: 1, marginRight: 4 }]}
            label="$"
            value={price}
            onChangeText={val => this.setState({ price: val })}
          />
          <TextInput
            mode="outlined"
            keyboardType="decimal-pad"
            maxLength={8}
            style={[_styles.textInputContainer, { flex: 1, marginLeft: 4 }]}
            label="Weight"
            value={weight}
            onChangeText={val => this.setState({ weight: val })}
          />
          <View style={{ flex: 1 }}>
            <WeightUnitelector
              onValueChange={this.handleUnitSelect}
              initialValue={units}
            />
          </View>
        </View>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textInputContainer: { marginVertical: 4 },
  textInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})
