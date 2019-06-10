import * as firebase from 'firebase'
import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AppContainer from 'screens/AppContainer'
import { theme } from 'styles/theme'

if (Platform.OS !== 'web') {
  window = undefined
}

const firebaseConfig = {
  apiKey: 'AIzaSyALAYTG4il_c_yUSkyuNBnCLzBByxcRDz8',
  authDomain: 'truhiker.firebaseapp.com',
  databaseURL: 'https://truhiker.firebaseio.com',
  projectId: 'truhiker',
  storageBucket: 'truhiker.appspot.com',
  messagingSenderId: '755812740277',
  appId: '1:755812740277:web:4149dd07611e36aa',
}

firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    )
  }
}
