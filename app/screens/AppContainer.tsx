/**
 * App Navigation
 */
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

/** SCREENS */
import { AppStack } from 'screens/app/navigator'
import { AuthLoadingScreen } from 'screens/auth/AuthLoadingScreen'
import { AuthStack } from 'screens/auth/navigator'

// Now AppContainer is the main component for React to render
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
