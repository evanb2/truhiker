import React, { Component } from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import firebase from 'react-native-firebase'
import {
  Button,
  Switch,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from '../styles/theme'
import { CategoryTable } from './CategoryTable'

enum Region {
  NONE = '',
  EASTCOAST = 'east_coast',
  ROCKIES = 'rockies',
  PNW = 'pnw',
  CALIFORNIA = 'california',
}
enum Units {
  OUNCE = 'oz',
  POUND = 'lb',
  GRAM = 'g',
}
// enum Seasons {
//   SUMMER = 'summer',
//   SPRING = 'spring',
//   FALL = 'fall',
//   WINTER = 'winter',
// }
interface ListItem {
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
interface State {
  name: string
  description: string
  isPublic: boolean
  region: Region
  units: Units
  listItems: ListItem[]
}

export class CreateListScreen extends Component<NavigationScreenProps, State> {
  static navigationOptions = {
    title: 'Create new Gear List',
    headerTitle: 'New Gear List',
  }

  ref = firebase.firestore().collection('gearlist')

  state = {
    name: '',
    description: '',
    isPublic: false,
    region: Region.NONE,
    units: Units.POUND,
    listItems: [],
  }

  handleNameChange = (name: string) => {
    this.setState({ name })
  }

  handleDescriptionChange = (description: string) => {
    this.setState({ description })
  }

  togglePublic = (): void => {
    this.setState({ isPublic: !this.state.isPublic })
  }

  saveGearList = async () => {
    try {
      const res = await this.ref.add({ ...this.state })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { name, description, isPublic, listItems } = this.state

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, margin: 16 }}>
          <TextInput
            label={'Name'}
            mode={'flat'}
            style={styles.inputs}
            value={name}
            onChangeText={this.handleNameChange}
          />
          <TextInput
            multiline
            label={'Description'}
            mode={'flat'}
            style={styles.inputs}
            value={description}
            onChangeText={this.handleDescriptionChange}
          />
          <View
            style={{
              ...styles.inputs,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Switch
              value={isPublic}
              onValueChange={this.togglePublic}
              style={{ marginRight: 8 }}
            />
            <Text>Public List</Text>
          </View>
          {/* {listItems} */}
          <Button icon={'add'} style={styles.inputs}>
            Add Category
          </Button>
          <TouchableRipple
            rippleColor={theme.colors.primary}
            style={styles.saveBtn}
            onPress={this.saveGearList}
          >
            <Button mode={'contained'}>Save</Button>
          </TouchableRipple>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  inputs: {
    marginVertical: 8,
  },
  saveBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 4,
  },
})
