import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";


// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
      <NavigationContainer>
      <Main />
      <Toast ref={(ref) => Toast.setRef(ref)} />

    </NavigationContainer>
         
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
