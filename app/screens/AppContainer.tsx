/**
 * App Navigation
 */
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { theme } from 'styles/theme'

/** SCREENS */
import { CreateListScreen } from 'screens/app/CreateListScreen'
import { HomeScreen } from 'screens/app/HomeScreen'
import { SettingsScreen } from 'screens/app/SettingsScreen'
import { AuthLoadingScreen } from 'screens/auth/AuthLoadingScreen'
import { AuthScreen } from 'screens/auth/AuthScreen'

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
