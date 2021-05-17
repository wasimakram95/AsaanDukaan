import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Home from '../screens/home';
import ShopDetails from '../screens/shopDetails';
import ShopHeader from '../shared/secondHeader';
import Cart from '../screens/Cart';
import Notification from '../screens/notifiation';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Asaan Dukaan' navigation={navigation} />
      }
    },
  },
  ShopDetails: {
    screen: ShopDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <ShopHeader title={navigation.getParam('name')} navigation={navigation} />
      }
    },
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <ShopHeader title='Cart' navigation={navigation} />
      }
    },
  },
  Notification: {
    screen: Notification,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <ShopHeader title='Notification' navigation={navigation} />
      }
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;


