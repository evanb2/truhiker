import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'

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
  isWorn: boolean
  isConsumable: boolean
}
interface State {
  title: string
  public: boolean
  region: Region
  units: Units
  listItems: ListItem[]
}

export class CreateListScreen extends Component<NavigationScreenProps, State> {
  state = {
    title: '',
    public: false,
    region: Region.NONE,
    units: Units.POUND,
    listItems: [],
  }

  render() {
    return (
      <ScrollView>
        <TextInput />
      </ScrollView>
    )
  }
}
