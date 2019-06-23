import { SimpleLineIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { AddGearScreen } from 'screens/app/AddGearScreen'
import { CreateListScreen } from 'screens/app/CreateListScreen'
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
        borderTopColor: theme.colors.primary,
        borderTopWidth: 1,
        height: IS_IPHONE_X ? 80 : 73,
      },
      showIcon: true,
      indicatorStyle: {
        backgroundColor: 'transparent',
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
        title: 'Gear Item',
      },
    },
    [Routes.CreateList]: {
      screen: CreateListScreen,
      navigationOptions: {
        title: 'New Packlist',
      },
    },
    [Routes.AddGear]: {
      screen: AddGearScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AppTabNav',
    mode: 'modal',
    defaultNavigationOptions: ({ navigation }) => {
      const { getParam } = navigation
      const rightAction = getParam('rightAction', () => {})
      const rightText = getParam('rightText', 'Done')
      const title = getParam('title')

      return {
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
        },
        headerTitle: title,
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
            {rightText}
          </Button>
        ),
      }
    },
  }
)

export { AppStack }
