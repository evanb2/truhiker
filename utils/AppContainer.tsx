/**
 * App Navigation
 */
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

/** SCREENS */
import { AuthLoadingScreen } from '../components/AuthLoadingScreen'
import { AuthScreen } from '../components/AuthScreen'
import { HomeScreen } from '../components/HomeScreen'

const AppStack = createStackNavigator({ Home: HomeScreen })
const AuthStack = createStackNavigator({ Auth: AuthScreen })

// Now AppContainer is the main component for React to render
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
