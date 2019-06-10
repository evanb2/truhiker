import firebase from 'firebase/app'
import 'firebase/firestore'
import React, { Component } from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  Button,
  Switch,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { CategoryTable } from 'screens/app/CategoryTable'
import { theme } from 'styles/theme'
import { GearItem, WeightUnits } from 'utils/types'

interface State {
  name: string
  description: string
  isPublic: boolean
  units: WeightUnits
  listItems: GearItem[]
}

export class CreateListScreen extends Component<NavigationScreenProps, State> {
  // static navigationOptions = {
  //   title: 'Create new Gear List',
  //   headerTitle: 'New Gear List',
  // }

  state = {
    name: '',
    description: '',
    isPublic: false,
    units: WeightUnits.OUNCES,
    listItems: [],
  }

  componentDidMount() {
    this.getAllGearLists()
  }

  getAllGearLists = async () => {
    // console.log(db)
    const querySnapshot = await firebase
      .firestore()
      .collection('gearlist')
      .get()
    querySnapshot.forEach(doc => console.log(doc.id, ' => ', doc.data()))
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

  // saveGearList = async () => {
  //   try {
  //     const res = await this.ref.add({ ...this.state })
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
