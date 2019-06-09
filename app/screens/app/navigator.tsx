import { SimpleLineIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { GearClosetScreen } from 'screens/app/GearClosetScreen'
import { GearItemScreen } from 'screens/app/GearItemScreen'
import { MyGearListsScreen } from 'screens/app/MyGearListsScreen'
import { SettingsScreen } from 'screens/app/SettingsScreen'
import { Routes } from 'screens/routes'
import { theme } from 'styles/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896

const AppTabNav = createMaterialTopTabNavigator(
  {
    [Routes.GearCloset]: {
      screen: GearClosetScreen,
      navigationOptions: {
        tabBarLabel: 'Gear Closet',
      },
    },
    [Routes.MyGearLists]: {
      screen: MyGearListsScreen,
      navigationOptions: {
        tabBarLabel: 'Lists',
      },
    },
    [Routes.Settings]: {
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
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        height: IS_IPHONE_X ? 80 : 73,
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
    [Routes.GearItem]: {
      screen: GearItemScreen,
      navigationOptions: {
        title: 'Add Item',
      },
    },
  },
  {
    initialRouteName: 'AppTabNav',
    mode: 'modal',
    defaultNavigationOptions: ({ navigation }) => {
      const { getParam } = navigation
      const rightAction = getParam('rightAction', () => {})
      return {
        headerBackImage: (
          <SimpleLineIcons
            name="close"
            size={20}
            style={{ paddingHorizontal: 16 }}
          />
        ),
        headerBackTitle: null,
        headerRight: (
          <Button mode="text" uppercase={false} onPress={rightAction}>
            Add
          </Button>
        ),
      }
    },
  }
)

export { AppStack }
