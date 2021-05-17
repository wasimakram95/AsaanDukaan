import React, { Component,useEffect, useContext, useState } from "react";
import {View, StyleSheet,Text,Platform,TextInput,TouchableOpacity,Image,Button} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { Label } from "native-base";
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
const profilepic= "../../assets/images/waleed.jpg"
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


export default function User (){
  return(
    <View style={styles.bgcolor}>
    <Image source={require(profilepic)} style= {styles.profilepic}/> 

    <Label style={styles.namelabel}>Waleed</Label>

    <View style={styles.usericon}>
    <AntDesign name="user" size={24} color="black" style={styles.icons1}/>    
    <TouchableOpacity ><Text style={styles.usertext}>Personal Info</Text></TouchableOpacity>
    </View>

    <View style={styles.tagsicon}>
    <AntDesign name="tags" size={24} color="black" style={styles.icons}/>
    <TouchableOpacity ><Text style={styles.tagstext}>Providings</Text></TouchableOpacity>
    </View>

    <View style={styles.paymenticon}>
    <MaterialIcons name="payment" size={24} color="black"style={styles.icons} />
    <TouchableOpacity ><Text style={styles.paymenttext}>Payment</Text></TouchableOpacity>
    </View>
    
    <View style={styles.hearticon}>
    <AntDesign name="heart" size={24} color="black" style={styles.icons} />
    <TouchableOpacity ><Text style={styles.hearttext}>Favorites</Text></TouchableOpacity>
    </View>

    <View style={styles.bookmarkicon}>
    <Entypo name="bookmark" size={24} color="black" style={styles.icons}/>
    <TouchableOpacity ><Text style={styles.bookmarktext}>Orders</Text></TouchableOpacity>
    </View>

    </View>
  );
}
  
const styles = StyleSheet.create({
    bgcolor:{
        backgroundColor:'rgb(255,255,255)',
        width:"100%",
        height:"100%"
    },
    profilepic:{
        marginTop:'5%',
        width: 100,
        height: 100,
        marginLeft:"4%",
        borderRadius: 200 / 2
    },
    namelabel:{
            borderWidth:1,
            borderColor:'rgb(38,134,125)',
            marginTop:"-20%",            
            marginLeft:"45%",
            fontSize:20,
            borderLeftColor:"#002525",
            borderLeftWidth:10,
            borderBottomWidth:0,
            borderRightWidth:0,
            borderTopWidth:0,
            paddingStart:15,    
        },
        usericon:{
marginTop:"25%",
marginLeft:"10%"
        },
        usertext:{
        color:'rgb(97,97,97)',
        marginTop:"-7%",
        marginLeft:"30%",
        fontSize:20
        },
        tagsicon:{
            marginTop:"7%",
            marginLeft:"10%"
        },
        tagstext:{
            color:'rgb(97,97,97)',
            marginTop:"-7%",
            marginLeft:"30%",
            fontSize:20
        },
        bookmarkicon:{
            marginTop:"7%",
            marginLeft:"10%"
        },
        bookmarktext:{
            color:'rgb(97,97,97)',
            marginTop:"-7%",
            marginLeft:"30%",
            fontSize:20
        },
        paymenticon:{
            marginTop:"7%",
            marginLeft:"10%"
        },
        paymenttext:{
            color:'rgb(97,97,97)',
            marginTop:"-7%",
            marginLeft:"30%",
            fontSize:20
        },
        hearticon:{
            marginTop:"7%",
            marginLeft:"10%"
        },
        hearttext:{
            color:'rgb(97,97,97)',
            marginTop:"-7%",
            marginLeft:"30%",
            fontSize:20
        }
     
               }

);


