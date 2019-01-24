import React, { PureComponent } from 'react'
import { View } from 'react-native'
import firebase from 'react-native-firebase'
import { Button } from 'react-native-paper'
import { DrawerItems, DrawerItemsProps, SafeAreaView } from 'react-navigation'
import { theme } from '../styles/theme'

export class AppDrawer extends PureComponent<DrawerItemsProps> {
  signout = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems activeTintColor={theme.colors.primary} {...this.props} />
          <Button onPress={this.signout}>Logout</Button>
        </SafeAreaView>
      </View>
    )
  }
}
