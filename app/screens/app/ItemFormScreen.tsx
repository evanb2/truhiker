import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'

export class ItemFormScreen extends Component {
  render() {
    return (
      <View style={_styles.screenContainer}>
        <Title>Add Item</Title>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
