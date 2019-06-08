/**
 * App Navigation
 */
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

/** SCREENS */
import { AppStack } from 'screens/app/navigator'
import { AuthLoadingScreen } from 'screens/auth/AuthLoadingScreen'
import { AuthScreen } from 'screens/auth/AuthScreen'

// Now AppContainer is the main component for React to render
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
