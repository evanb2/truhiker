import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export class AddGearScreen extends Component<NavigationScreenProps> {
  componentWillMount() {
    const { navigation } = this.props
    const { setParams } = navigation

    setParams({ rigthText: 'Next' })
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  //
})
