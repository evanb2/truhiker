/**
 * App Navigation
 */
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'

/** SCREENS */
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthScreen from '../screens/AuthScreen'
import HomeScreen from '../screens/HomeScreen'

const AppStack = createStackNavigator({ Home: HomeScreen })
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
