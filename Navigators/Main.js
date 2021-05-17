import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,Image,
  TouchableOpacity,TouchableHighlight
} from 'react-native';

import InitialStack from "../Screens/Startup/slidescreens";
import Home from "../Screens/Home/Home";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Stack = createStackNavigator();
export default function Main() {
return(
  <View style= {Mystyle.container}>
    <Stack.Navigator initialRouteName="InitialStart" headerMode="none">
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="InitialStart" component={InitialStack} />
    </Stack.Navigator>
    </View>
    );
}


const Mystyle= StyleSheet.create({
  container:{
    height: hp('100%'), // 70% of height device screen
    width: wp('100%')   // 80% of width device screen
  }
});