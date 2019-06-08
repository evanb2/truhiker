/**
 * App Navigation
 */
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { theme } from '../styles/theme'

/** SCREENS */
import { AuthLoadingScreen } from './AuthLoadingScreen'
import { AuthScreen } from './AuthScreen'
import { CreateListScreen } from './CreateListScreen'
import { HomeScreen } from './HomeScreen'
import { SettingsScreen } from './SettingsScreen'

const AppTabNav = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    CreateList: CreateListScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
      },
      showIcon: true,
      showLabel: false,
    },
  }
)

// Now AppContainer is the main component for React to render
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthScreen,
      App: AppTabNav,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
