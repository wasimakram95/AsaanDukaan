import React, { useContext } from "react";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BottomtabNavigator from "./BottomtabNavigator";
import Stacknavigator from "./Stacknavigator";

const Stack = createStackNavigator();
    
export default function Main() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MyStacker" headerMode="none">
      <Stack.Screen name="MyStacker" component={Stacknavigator} />
      <Stack.Screen name="Mytab" component={BottomtabNavigator} />
    </Stack.Navigator>

    </NavigationContainer>
    
      );
}
