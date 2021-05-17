import React, {Component } from "react";
import {View,I, StyleSheet,TextInput} from 'react-native';

import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';
import COLORS from '../../consts/colors';

import { Label } from "native-base";
const Stack = createStackNavigator();



export default function Search() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Sb}
          options={{ title: 'Search' }}
        />
      </Stack.Navigator>
    );
  }
  const abc=new Array(10);

  class Sb extends React.Component {
   state = {
     search: '',
   };

     updateSearch=(search) =>{
     this.setState({ search });
    for(let i=0;i <10;i++){
         abc[i]=search;
     }
    }

    render() {
      const { search } = this.state;
      
      return (
        <View>
        <View style={styles.inputContainer}>
        <Icon name="search" size={28} />
        <TextInput
        placeholder="Search Here..."
        onChangeText={this.updateSearch}
        value={search}
        inputContainerStyle={{backgroundColor:'white'}}
        placeholderTextColor={'#g5g5g5'}
        style={{color: COLORS.grey}}
      />
        </View>
        
        <Label style={styles.label}>Recent Searches</Label>
        <View style={styles.searches}>
        <Label style={styles.labels}>{abc[1]}</Label>
        <Label style={styles.labels}>{abc[2]}</Label>
        <Label style={styles.labels}>{abc[3]}</Label>
        <Label style={styles.labels}>{abc[4]}</Label>
        <Label style={styles.labels}>{abc[5]}</Label>
        <Label style={styles.labels}>{abc[6]}</Label>
        <Label style={styles.labels}>{abc[7]}</Label>
        <Label style={styles.labels}>{abc[8]}</Label>
        <Label style={styles.labels}>{abc[9]}</Label>
        
        </View>
        </View>
      );
    }
  }  
  

const styles = StyleSheet.create({
  label:{
    fontSize:30,
    marginTop:80,
    marginLeft:15
  },
  searches:{
    paddingLeft:10,
  },
  labels:{
    fontSize:20,
    paddingTop:10
  },
  inputContainer: {
    height: 45,
    width: '98%',
    marginLeft:"1%",
    marginTop:10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 12,
  },
}
);

