// Stacks
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";

import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import CartNavigator from "./CartNavigator";
import AdminNavigator from "./AdminNavigator";

// it should be the homescreen

import UserProfile from '../Screens/User/UserProfile';


const Tab = createBottomTabNavigator();

export default function BottomtabNavigator(){
  const context = useContext(AuthGlobal)
    return (
      <Tab.Navigator
      initialRouteName="User"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      ): null }
      
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>

  
      );
}