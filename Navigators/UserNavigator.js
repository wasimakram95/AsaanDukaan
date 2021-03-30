import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import UserProfile from '../Screens/User/UserProfile';

import Register from '../Screens/User/Register';
// import Login from '../Screens/User/Login';



const UserStack = createStackNavigator();

function MyStack() {
    return (
        <UserStack.Navigator>
            {/* <UserStack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
             <UserStack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            /> */}
             <UserStack.Screen 
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
        </UserStack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}