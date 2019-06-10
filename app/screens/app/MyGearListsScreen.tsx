import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'

export class MyGearListsScreen extends Component {
  render() {
    return (
      <View style={_styles.screenContainer}>
        <Title>My Gear Lists</Title>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
