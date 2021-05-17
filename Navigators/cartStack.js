import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import OtherHeader from '../shared/otherHeader';
import Cart from '../screens/Cart';

const screens = {
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <OtherHeader title='Cart' navigation={navigation} />
      }
    },
  },
}

const CartStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default CartStack;