/**
 * App Navigation
 */
import React from 'react'
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { AppDrawer } from './AppDrawer'

/** SCREENS */
import { AuthLoadingScreen } from './AuthLoadingScreen'
import { AuthScreen } from './AuthScreen'
import { CreateListScreen } from './CreateListScreen'
import { HomeScreen } from './HomeScreen'

const CreateListStack = createStackNavigator({
  CreateListForm: CreateListScreen,
})

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    CreateList: CreateListStack,
  },
  {
    contentComponent: props => <AppDrawer {...props} />,
  }
)

const AuthStack = createStackNavigator({ Auth: AuthScreen })

// Now AppContainer is the main component for React to render
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
