import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// stacks
import HomeStack from './homeStack';
import SettingsStack from './setttingsStack';
import Home from '../screens/home';
import Cart from '../screens/Cart';
import Notification from '../screens/notifiation';
import CartStack from './cartStack';
import NotificationStack from './NotificationStack';

const Tab = createBottomTabNavigator(
  {
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <MaterialIcons name='home' size={30} />
      ),
    }
  },
  CartStack : {
    screen: CartStack,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: () => (
        <MaterialIcons name='shopping-cart' size={30}/>
      )
    }
  },
  /*QRScanner : {
    screen: CartStack,
    navigationOptions: {
      tabBarLabel: 'Scan QR',
      tabBarIcon: () => (
        <MaterialIcons name='qr-code-scanner' size={30}/>
      )
    }
  },*/
  Notifications : {
    screen: NotificationStack,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: () => (
        <MaterialIcons name='notifications' size={30} badgeCount={5}/>
      ),
    },
  },
  SettingsStack: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: () => (
        <MaterialIcons name='person' size={30} />
      ),
    }
  },
});

export default Tab;