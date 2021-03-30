import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import OtpInputs from './otpinputs';
import React, { useEffect, useContext, useState } from "react";

export default class otp extends React.Component {
  state={otp:''};
  getOtp=(otp)=> {
    this.setState({ otp });
  }

  render() {
    return (
      <View style={styles.container}>
      
      <Text style={styles.text}>Enter the code, sent on your given number</Text>
      <OtpInputs getOtp={(otp) =>{ 
        this.getOtp(otp)
      }}/>
      <View>  
      <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate("Mytab");
        }
        }     >    
     <Text 
     style={{
     fontWeight:"bold",
     textAlign:"center",
     color:"#003333",
     fontSize:20,
     marginBottom:40
     }}>
     Enter
     </Text>
     </TouchableOpacity>
     </View> 
     <View>
       <TouchableOpacity onPress={()=>{
        this.props.navigation.navigate("Login");
        }
        }
     >
          <Text 
          style={{
          fontWeight:"bold",
          textAlign:"center",
          color:"#003333",
          fontSize:20,
          marginBottom:40
          }}>
          Resend The Code
          </Text>
          </TouchableOpacity>
      </View>
          
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255,255,255)',
  }  ,
  text:{
    marginLeft:10,
    paddingTop:40,
    fontSize:17,
  }
});
