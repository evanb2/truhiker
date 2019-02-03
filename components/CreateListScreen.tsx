import React, { Component } from 'react'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  Button,
  Card,
  DataTable,
  Switch,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from '../styles/theme'

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

  togglePublic = () => {
    this.setState({ isPublic: !this.state.isPublic })
  }

  saveGearList = () => {
    console.log(this.state)
  }

  render() {
    const { name, description, isPublic } = this.state

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
          <Card>
            <Card.Content>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ flex: 4 }}>Shelter</DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 3 }}>
                    Price
                  </DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 2 }}>
                    Weight
                  </DataTable.Title>
                  <DataTable.Title numeric style={{ flex: 1 }}>
                    Qty
                  </DataTable.Title>
                </DataTable.Header>

                <DataTable.Row style={{ height: 32 }}>
                  <DataTable.Cell style={{ flex: 4 }}>Borah 7x9</DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 3 }}>
                    99
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 2 }}>
                    6.0
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 1 }}>
                    1
                  </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ height: 32 }}>
                  <DataTable.Cell style={{ flex: 4 }}>
                    Borah Cuben Bivy
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 3 }}>
                    179
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 2 }}>
                    6.0
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 1 }}>
                    1
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
          <Button icon={'add'} style={styles.inputs}>
            Add Category
          </Button>
          <TouchableRipple
            rippleColor={theme.colors.primary}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              borderRadius: 4,
            }}
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
})
