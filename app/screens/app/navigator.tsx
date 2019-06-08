import { SimpleLineIcons } from '@expo/vector-icons'
import React from 'react'
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
    GearCloset: {
      screen: GearClosetScreen,
      navigationOptions: {
        tabBarLabel: 'Gear Closet',
      },
    },
    MyGearLists: {
      screen: MyGearListsScreen,
      navigationOptions: {
        tabBarLabel: 'Lists',
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
      },
    },
  },
  {
    initialRouteName: 'GearCloset',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
      },
      showIcon: true,
      indicatorStyle: {
        backgroundColor: 'white',
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let iconName
        const { routeName } = navigation.state
        switch (routeName) {
          case 'GearCloset':
            iconName = 'home'
            break
          case 'MyGearLists':
            iconName = 'notebook'
            break
          case 'Settings':
            iconName = 'settings'
            break
          default:
            break
        }
        return <SimpleLineIcons name={iconName} size={24} color={tintColor} />
      },
    }),
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
  }
)

export { AppStack }
