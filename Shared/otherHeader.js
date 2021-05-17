import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title }) {

  return (
    <ImageBackground style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    letterSpacing: 1,
    color: 'black',
    alignContent: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    left: 350,
    color: 'white',
  },
  headerTitle: {
    flexDirection: 'row'
  },
});