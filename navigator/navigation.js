import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Slider from '../screens/slidescreens';
import login from '../screens/login';
import otp from '../screens/otp';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Slider" headerMode="none">
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Otp" component={otp} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  
}
    