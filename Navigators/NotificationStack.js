import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import OtherHeader from '../shared/otherHeader';
import Cart from '../screens/Cart';
import Notification from '../screens/notifiation';

const screens = {
  Notification: {
    screen: Notification,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <OtherHeader title='Notifications' navigation={navigation} />
      }
    },
  },
}

const NotificationStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default NotificationStack;