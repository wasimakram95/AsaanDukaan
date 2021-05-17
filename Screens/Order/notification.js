import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';

export default function Notification({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text>No Notifications Right Now!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    notification: {
        alignContent: 'center',       
    },
});