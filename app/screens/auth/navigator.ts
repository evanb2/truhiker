import { createStackNavigator } from 'react-navigation'
import { AuthScreen } from 'screens/auth/AuthScreen'
import SignupScreen from 'screens/auth/SignupScreen'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'

const AuthStack = createStackNavigator(
  {
    [Routes.Auth]: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    [Routes.Signup]: {
      screen: SignupScreen,
    },
  },
  {
    initialRouteName: Routes.Auth,
    defaultNavigationOptions: {
      headerTintColor: theme.colors.primary,
      headerStyle: {
        backgroundColor: theme.colors.backdrop,
        borderBottomWidth: 0,
      },
    },
  }
)

export { AuthStack }
