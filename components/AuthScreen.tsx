import React, { Component } from 'react'
import { Text, View } from 'react-native'

interface Props {}
export class AuthScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
      </View>
    )
  }
}
