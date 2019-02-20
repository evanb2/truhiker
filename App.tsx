/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AppContainer from './components/AppContainer'
import { theme } from './styles/theme'

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer />
        </SafeAreaView>
      </PaperProvider>
    )
  }
}
