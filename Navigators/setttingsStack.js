import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import OtherHeader from '../shared/otherHeader';
import SecondHeader from '../shared/secondHeader';
//import Settings from '../screens/settings';
import UserProfile from '../screens/User';

const screens = {
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <OtherHeader title='Profile' navigation={navigation} />
      }
    },
  },
}

const SettingsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default SettingsStack;