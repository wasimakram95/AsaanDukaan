import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import OtpInputs from './otpinputs';

export default class otp extends React.Component {
  state={otp:''};
   getOtp(otp) {
        // console.log(otp);
        this.setState({ otp });
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Enter the code, sent on your given number</Text>
      <OtpInputs getOtp={(otp) => this.getOtp(otp)} />

      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
          <Text 
          style={{
          fontWeight:"bold",
          textAlign:"center",
          color:"#003333",
          fontSize:20,
          marginBottom:45
          }}>
          Resend The Code
          </Text>
          </TouchableOpacity>
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
