import React, { Component,useEffect, useContext, useState } from "react";
import {View, StyleSheet,Text,Platform,TextInput,TouchableOpacity,Image,Button} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { Label } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const Stack = createStackNavigator();


export default function Setting(){
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Personal Info"
        component={Mystates}
        options={{ 
            title: 'Personal Info'
        }}
      />
    </Stack.Navigator>
  );
}
function Mystates(){
  return(
    <View style={styles.bgcolor}>

    <Label style={styles.labelposition} >Name</Label>
   
    <TextInput style={styles.inputposition} placeholder={"Enter your Name"}
     value={""}   ></TextInput>

    <Label style={styles.labelposition} >Email ID</Label>
    <TextInput style={styles.inputposition} placeholder={"Enter your Email"}
     value={""}   ></TextInput>
   
    <Label style={styles.labelposition}>Mobile Number</Label>
    <TextInput style={styles.inputposition} placeholder={"Enter your Number"}
     value={""}   ></TextInput>
   
    <Label style={styles.labelposition} >Address</Label>
    <TextInput style={styles.inputposition}  placeholder={"Enter your Address"}
     value={""}   ></TextInput>

    <Ipicker />    
     
    
    <TouchableOpacity ><Text style={styles.button2}> Save</Text></TouchableOpacity>

    </View>

  );
}
function Ipicker() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []); const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View >
    <View style={{alignItems:"center", marginTop:"10%"}}>{image && <Image source={{ uri: image }} style={{width: 100,
            height: 100,
            borderRadius: 200 / 2}} />}
    </View>
    <TouchableOpacity onPress={pickImage} ><Text style={styles.button}> Choose Photo</Text></TouchableOpacity>
    </View>
    

  );
}
  
const styles = StyleSheet.create({
    bgcolor:{
        backgroundColor:'rgb(255,255,255)',
        
    },
    labelposition:{
        borderWidth:1,
        borderColor:'rgb(38,134,125)',
        marginTop:"10%",
        fontSize:20,
        marginLeft:"6%",
        borderLeftColor:"#002525",
        borderLeftWidth:10,
        borderBottomWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
        paddingStart:15,    
    },
    inputposition:{
        marginTop:"-7%",
        fontSize:18,
        marginLeft:"50%",
    },
    button:{
      color:'rgb(51, 163, 103)',
      marginTop:"5%",
      alignSelf:"center",
      fontSize:20
    } ,
    button2:{
      color:'rgb(9, 54, 235)',
      marginTop:"10%",
      alignSelf:"center",
      fontSize:20,
      marginBottom:70
    }
               }

);


