import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';

export default function Header({ title, navigation }) {

  /*const openMenu = () => {
    navigation.openDrawer();
  }*/

  return (
    <ImageBackground style={styles.header}>
      {/*<MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />*/}
      <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.jpeg')}
      />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {/* <MaterialIcons
        name='shopping-cart'
        size={28}
        style={styles.headerCartIcon}
        onPress={() => navigation.navigate('Cart')}
      />
      <MaterialIcons
        name='notifications'
        size={28}
        style={styles.headerNotificationIcon}
        onPress={() => navigation.navigate('Notification')}
      /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    height: 50,
    width: 60,
    marginLeft: 20,
    backgroundColor: 'rgba(28, 28, 28, 0.8)',
  },
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 28, 28, 0.8)',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'robotoSlab-bold',
    color: '#333',
    letterSpacing: 1,
    color: 'white',
    alignContent: 'flex-start',
    marginLeft: 35,
  },
  icon: {
    position: 'absolute',
    left: 16,
    color: 'white',
  },
  headerCartIcon: {
    position: 'absolute',
    left: 310,
    color: 'white',
  },
  headerNotificationIcon: {
    position: 'absolute',
    left: 350,
    color: 'white',
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row'
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});