import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity, State } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'
import { theme } from 'styles/theme'

enum Units {
  OUNCE = 'oz',
  POUND = 'lb',
  GRAM = 'g',
}

interface State {
  name: string
  description: string
  price: number
  weight: number
  units: Units
  quantity: number
  photoUrl: string
  linkUrl: string
  worn: boolean
  consumable: boolean
}

export class ItemFormScreen extends Component<State> {
  state = {
    name: '',
    description: '',
    price: '',
    weight: '',
    linkURL: '',
    worn: false,
    consumable: false,
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
        />
        <TextInput
          style={_styles.textInputContainer}
          label="Description"
          value={description}
        />
        <View style={_styles.textInputRow}>
          <TextInput
            style={[_styles.textInputContainer, { flex: 1, marginRight: 4 }]}
            label="Price"
            value={price}
          />
          <TextInput
            style={[_styles.textInputContainer, { flex: 1, marginLeft: 4 }]}
            label="Weight"
            value={weight}
          />
        </View>
        <TextInput
          style={_styles.textInputContainer}
          label="Link"
          value={linkURL}
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
