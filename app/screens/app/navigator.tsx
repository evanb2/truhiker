import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'

import { GearClosetScreen } from 'screens/app/GearClosetScreen'
import { ItemFormScreen } from 'screens/app/ItemFormScreen'
import { MyGearListsScreen } from 'screens/app/MyGearListsScreen'
import { SettingsScreen } from 'screens/app/SettingsScreen'
import { theme } from 'styles/theme'

const AppTabNav = createMaterialTopTabNavigator(
  {
    GearCloset: GearClosetScreen,
    MyGearLists: MyGearListsScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'GearCloset',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    navigationOptions: {
      header: null,
    },
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

const AppStack = createStackNavigator(
  {
    AppTabNav,
    ItemForm: ItemFormScreen,
  },
  {
    initialRouteName: 'AppTabNav',
    mode: 'modal',
    defaultNavigationOptions: {
      //
    },
  }
)

export { AppStack }
