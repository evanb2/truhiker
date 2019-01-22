import React, { Component } from 'react'
import { Text, View } from 'react-native'

interface Props {}
export class HomeScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    )
  }
}
