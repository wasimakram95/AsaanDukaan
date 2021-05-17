import React from "react";
import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { createStackNavigator } from '@react-navigation/stack';
import login from "./login";
import otp from "./otp";


const Stack = createStackNavigator();

export default function InitialStack() {
  return (
    <Stack.Navigator initialRouteName="Slider" headerMode="none">
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Otp" component={otp} />
      </Stack.Navigator>
  );

  
}
const slides = [
    {
    key: "two",
    title: "Shop at Ease",
    text:
      "ENJOY YOUR JOURNEYY",
      image: require("../../assets/images/screen02.png"),
      backgroundColor: '#FFFFFF',

  },
  {
    key: "three",
    title: "Find Shops Near to You",
    text:
      "Your One Stop For All Needs",
      image: require("../../assets/images/screen03.png"),
      backgroundColor: '#FFFFFF',

  },
  {
    key: "four",
    title: "Get Served at your Home",
    text:
      "Now life is Easier !",
      image: require("../../assets/images/screen04.png"),
      backgroundColor: '#FFFFFF',

  },
  {
    key: "five",
    title: "Open Your Shop",
    text:
      "A World Full of Opportunities",
      image: require("../../assets/images/screen05.png"),
      backgroundColor: '#FFFFFF',

  },
  

];

class Slider extends React.Component {
  
  state = { showHomePage: false };
  _renderItem = ({ item }) => {
    return (
      <View style={
          { flex: 1 },
      {backgroundColor:'#FFFFFF'}
        }
      >
        <Image
          source={item.image}
          style={{
            resizeMode: "contain",
            marginTop:"10%",
            height: "70%",
            width: "100%",
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#21465b",
            alignSelf: "center",
          }}
        >

          
{item.title}
        </Text>

        <Text style={{
          textAlign:"center",
          color:"#b5b5b5",
          fontSize:15,
        }}>
          {item.text}
        </Text>
        

        <TouchableOpacity onPress={() => this.props.navigation.replace('Login')} >
          <Text 
          style={{
          marginVertical:27,
          fontWeight:"bold",
          textAlign:"center",
          color:"#003333",
          fontSize:20,
          }}>
            Skip
          </Text>
  
          </TouchableOpacity>
                </View>
    );
  };
 
  render() {
    if (this.state.showHomePage){
      return <Slider/>
    } else 
    return (
    <AppIntroSlider
      renderItem={this._renderItem} 
      data={slides} 
        activeDotStyle={{
        backgroundColor:"#21465b",
        width:30,
        }}
        
     />
  
    );
    
}

}
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      paddingTop:40,
      fontSize:50,
      backgroundColor: 'rgb(255,255,255)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  
