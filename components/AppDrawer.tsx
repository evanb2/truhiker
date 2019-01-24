import React, { PureComponent } from 'react'
import { Button, View } from 'react-native'
import firebase from 'react-native-firebase'
import { DrawerItems, DrawerItemsProps, SafeAreaView } from 'react-navigation'

export class AppDrawer extends PureComponent<DrawerItemsProps> {
  signout = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
          <Button title="Logout" onPress={this.signout} />
        </SafeAreaView>
      </View>
    )
  }
}
