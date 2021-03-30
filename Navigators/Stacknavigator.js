import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Slider from "../Screens/slidescreens";
import login from "../Screens/login"
import otp from "../Screens/otp"

const Stack = createStackNavigator();

export default function Stacknavigator() {
  return (
    <Stack.Navigator initialRouteName="Slider" headerMode="none">
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Otp" component={otp} />
      </Stack.Navigator>
  );

  
}
    