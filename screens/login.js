import React from 'react';
import {Text,View,Image, StyleSheet,TextInput} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

const upperimage= "../assets/images/upperimage.png"
const bannerimage1= "../assets/images/banner1.png"

const login =() =>{
  const navigation= useNavigation();
  
  
  return(
    <View > 
    <Image source={require(upperimage)} style= {styles.upperimage}/> 
    <Image source={require(bannerimage1)} style= {styles.banner1}/>
    <TextInput keyboardType = 'numeric' placeholder="Enter your mobile number" style={styles.input}
    maxLength={12}  autoFocus={true}

    onSubmitEditing={() => navigation.navigate('Otp')}
    />
      
    <Text style={styles.connect}>Or Connect With </Text>   
    
      <View >
        <SocialIcon style={styles.fbicon}
        type='facebook'
        
      />
      
      <SocialIcon style={styles.googleicon}
        type='google'
      />
      
      <SocialIcon style={styles.appleicon}
        type='apple'
      />
    
      </View>
      <Text style={styles.lasttext1}>By signinup, you are accepting</Text>   
      <Text style={styles.lasttext2}>Our Terms Conditions and Privacy Policy</Text>   
      </View>

    );
}  
export default login;

const styles = StyleSheet.create({
    upperimage:{
        marginTop:"-50%",
        resizeMode:"contain",
        width:"100%",
        
    },
    banner1:{
        marginTop:"-37%",
        resizeMode:"contain",
        marginLeft:"15%",
        width:"70%"
        },
    
    input:{
        borderWidth:1,
        borderColor:'rgb(38,134,125)',
        marginTop:"0%",
        fontSize:17,
        marginLeft:"22%",
        borderLeftColor:"#002525",
        borderLeftWidth:10,
        borderBottomWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
        paddingStart:15,
        },
        connect:{
            paddingTop:40,
            fontSize:17,
            alignSelf:"center"
        },
        fbicon:{
          marginTop:20,
          marginLeft:45,
        },
        googleicon:{
          marginTop:-59,
          marginLeft:150,

        },
        appleicon:{
            marginTop:-59,
            marginLeft:270
        },
        lasttext1:{
          fontSize:17,
          marginTop:30,
          alignSelf:"center",
        },
        lasttext2:{
          fontSize:17,
          alignSelf:"center",
          textDecorationLine: 'underline'
        }
  });