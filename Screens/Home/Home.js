import React, {useState,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,Modal,
  Dimensions,Image,
  TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionics from "react-native-vector-icons/Ionicons";
import { globalStyles } from '../../styles/global';

import COLORS from '../../consts/colors';
import places from '../../consts/places';
import shops from '../../consts/shops';

import User from "../User/User";
import Search from "../Search/Search";
import Setting from "../Setting/Setting";
import Cart from "../../Screens/Order/Cart";
import ShopDetails from "../../Screens/Order/shopDetails";

import Notifications from "../../Screens/Order/notification";
import {useNavigation} from '@react-navigation/native'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import { SliderBox } from 'react-native-image-slider-box';
import { FastImage } from 'react-native-fast-image';
import axios from "axios";
import AddShopForm from '../../Screens/Order/addShopsForm';
import { MaterialIcons } from '@expo/vector-icons';


const {width} = Dimensions.get('screen');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Homes} />
      <Stack.Screen name="Services" component={Serviced} />
      <Stack.Screen name="Shops" component={Shops} />
      <Stack.Screen name="Stalls" component={Stalled} />

      {/* Now we will insert screens for bottom tab navigator. */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Shop Details" component={ShopDetails} />
      <Stack.Screen name="AddShop" component={MyShop} />



      </Stack.Navigator>
    
  ); 
}

const MyShop=()=>{
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [shopsArray, setShopsArray] = useState(['']);

  const findCoords=()=>{
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        setLatitude(latitude);
        setLongitude(longitude);
        // console.log(longitude, latitude);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const addReview = (shops) => {
    console.log('BEFORE');
    console.log(shops);
    let shop = {
      name: shops.name,
      longitude: shops.longitude,
      latitude: shops.latitude,
      _type: shops._type
    };
    console.log('AFTER');
    console.log(shop);
    setModalOpen(false);


    axios.post(`https://asaan-dukaan-back.herokuapp.com/api/store`, shop, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTViZDFmNzQ5MGI3NTI4NGIwYWVjYyIsImlhdCI6MTYxNjMyOTY2NX0.CmsP-S3pTu7y54MRjrirKYWmat4VZJZQu5SH0SBV1kE',
      },
    }).then((response) => {
      console.log('ADD SHOP RESPONSE');
      console.log(response);
      if (response.data.status == 200) {
        setShopsArray(response.data.data);
      }
    })
      .catch((err) => {
        console.log('Error');
        console.log(err)
      });
    setModalOpen(false);



  }

  useEffect(

    () => {
      findCoords();
      // console.log("Latituede and longitude",findCoords().latitude,findCoords().longitude);
      let coordinates = {
        latitude: latitude,
        longitude: longitude,
      };
      console.log(coordinates);

      axios.post(`https://asaan-dukaan-back.herokuapp.com/api/store/nearby`, coordinates, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTViZDFmNzQ5MGI3NTI4NGIwYWVjYyIsImlhdCI6MTYxNjMyOTY2NX0.CmsP-S3pTu7y54MRjrirKYWmat4VZJZQu5SH0SBV1kE',
        },
      }).then((response) => {
        console.log('GET SHOP KA RESPONSE');
        console.log(response);
        // console.log('CUSTOMIZED DATA');
        // console.log(response.data.data);
        if (response.data.status == 200) {

          setShopsArray(response.data.data);
        }
        // console.log('SHOPS ARRAY')
        // console.log(shopsArray);
      })
        .catch((error) => {
          console.log('Error');
          console.log(error);
        }), [coordinates]
    }, [findCoords()]
  );

  return(
    <View style={styles.modalContent}>
    <Text h2 style={styles.h2Style}>Add Shop</Text>
    <AddShopForm addReview={addReview} />
    </View>
      );
}
  //BottomTabNavigator
  const BottomTabNavigator=({})=>{
    const navigation = useNavigation(); 
       return(
      <View>
      <Tab.Navigator
      tabBarOptions={{
        
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
          
       
         <Tab.Screen name="Home" component={Search}
         options={{
                tabBarIcon: ({ focused }) => (
                  <View style={{alignItems:'center', justifyContent:'center',marginTop:10}}> 
                   <TouchableHighlight
                  onPress={() => navigation.navigate('Home')}>
                    <Image 
                  source={require("../../assets/bottomtab/homebox.png")}
                  resizeMode='contain' 
                  style={{width:25,height:25}}
                  />
                  </TouchableHighlight>
                  <View style={{borderColor: COLORS.primary,marginTop:8,borderWidth: 2,borderLeftWidth:25,borderRightWidth:25}}/>
                  </View>
                  
                  
                ),
              }}
            /> 

        <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ focused }) => (
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>

                   
                  <TouchableHighlight
                  onPress={() => navigation.navigate('Search')}>
                    <Image 
                  source={require("../../assets/bottomtab/searchicon.png")}
                  resizeMode='contain' 
                  style={{width:25,height:25 }}
                  />
                  </TouchableHighlight>
                  </View>
                 
                  
                ),
              }}
            />
        
        {/* Yahan ana hai Add Shop ka navigation link*/}
              <Tab.Screen name="Shop" component={MyShop} options={{
                 tabBarIcon: ({ focused }) => (
                  <View style={{alignItems:'center', justifyContent:'center', top:1}}>
 
                   <TouchableHighlight
                  onPress={() => navigation.navigate('AddShop')}>
                  <Image 
                  source={require("../../assets/bottomtab/shopcircle.png")}
                  resizeMode='contain' 
                  style={{width:35,height:35 }}
                  />
                  </TouchableHighlight>
                  </View>
                 
                ),
              }}
            />

<Tab.Screen name="User" component={User} options={{
                tabBarIcon: ({ focused }) => (
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>

                   
                  <TouchableHighlight
                  onPress={() => navigation.navigate('User')}>
                    <Image 
                  source={require("../../assets/bottomtab/profileicon.png")}
                  resizeMode='contain' 
                  style={{width:25,height:25 }}
                  />
                  </TouchableHighlight>
                  </View>
                 
                  
                ),
              }}
            />

<Tab.Screen name="Setting" component={Setting} options={{
                tabBarIcon: ({ focused }) => (
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>

                   
                  <TouchableHighlight
                  onPress={() => navigation.navigate('Setting')}>
                    <Image 
                  source={require("../../assets/bottomtab/settingicon.png")}
                  resizeMode='contain' 
                  style={{width:25,height:25 }}
                  />
                  </TouchableHighlight>
                  </View>
                 
                  
                ),
              }}
            />
          </Tab.Navigator>
          </View>   
    );
  }
  
  //Image Slider At Top
  const Slide=()=>{
    
    const [images] = useState([
      
      require("../../assets/images/search.jpg"),
      require("../../assets/images/shop.jpg"),
      require("../../assets/images/pay.jpg"),
      require("../../assets/images/deliver.jpg")
      
    ]);

  
    return (
      <View style={globalStyles.container}>
        <SliderBox
          ImageComponent={FastImage}
          images={images}
          sliderBoxHeight={130}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5, marginRight: 40, }}
          imageLoadingColor="#2196F3"
        />
        </View>
  );
  }

  //All Tabs
  const Homes = ({}) => {
    const navigation = useNavigation(); 

  const ListCategories = () => {
    return (
      <View>

  <TouchableHighlight
  style={style.submit1}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Home')}  >

  
    <Text style={style.submitText1}>All</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={style.submit2}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Services')}  >
  <Text style={style.submitText}>Services</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={style.submit3}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Shops')}  >

    <Text style={style.submitText}>Shops</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={style.submit4}  
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Stalls')}  >

    <Text style={style.submitText}>Stalls</Text>
</TouchableHighlight>
          </View>
        
      
    );
  };
    
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Shop Details')}
        >
        {/* Images Code */}
        <ImageBackground style={style.cardImage} source={place.image}>
          <View>
          <Ionics
          name="md-heart-circle-outline"
          color={COLORS.light}
          size={30}
          style={style.myheart}
          />
          </View>
          </ImageBackground>
  
  
          {/* for bottom text */}
       
          <View style={{
              backgroundColor:COLORS.white,
              paddingHorizontal:6,
              height: 70,
              width: (width / 2),
              borderBottomLeftRadius:5,
              borderBottomRightRadius:5,
              borderColor:COLORS.dark,
              borderWidth:.5,
              backgroundColor:COLORS.white,
              justifyContent: 'space-between',
              flexDirection: 'row',
              
              }}>

            <View style={{flexDirection:'column',justifyContent:"center"}}>

            <Text style={{
              color: COLORS.dark,
              fontSize: 18,
              fontWeight: 'bold',
              paddingHorizontal:15,
              paddingBottom:2,
                          }}>
            {place.name}
            </Text>

            <View style={{flexDirection:"row"}}>
            
              <Icon name="place" size={20} color={COLORS.dark} />
              <Text style={{marginLeft: 5, color: COLORS.dark}}>
                {place.location}
              </Text>

              <View style={{flex:1,flexDirection:"row-reverse"}}>
              <Icon name="star" size={15} color={COLORS.dark}   />
              </View>

              <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

            </View>
            

               
          </View>

          </View>
      </TouchableOpacity>
    );
  };

  

// MoreShops Section
  const RecommendedCard = ({place}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Shop Details')}
      >
      {/* Images Code */}
      <ImageBackground style={style.cardImage} source={place.image}>
        <View>
        <Ionics
        name="md-heart-circle-outline"
        color={COLORS.light}
        size={30}
        style={style.myheart}
        />
        </View>
        </ImageBackground>


        {/* for bottom text */}
     
        <View style={{
            backgroundColor:COLORS.white,
            paddingHorizontal:6,
            height: 70,
            width: (width / 2),
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            borderColor:COLORS.dark,
            borderWidth:.5,
            backgroundColor:COLORS.white,
            justifyContent: 'space-between',
            flexDirection: 'row',
            
            }}>

          <View style={{flexDirection:'column',justifyContent:"center"}}>

          <Text style={{
            color: COLORS.dark,
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom:2,
                        }}>
          {place.name}
          </Text>

          <View style={{flexDirection:"row"}}>
          
            <Icon name="place" size={20} color={COLORS.dark} />
            <Text style={{marginLeft: 5, color: COLORS.dark}}>
              {place.location}
            </Text>

            <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Icon name="star" size={15} color={COLORS.dark}   />
            </View>

            <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

          </View>
          

             
        </View>

        </View>
    </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
     
      <StatusBar translucent={false} backgroundColor={COLORS.dark} />
     
      <View style={style.header}>
        <Icon name="format-align-justify" size={28} color={COLORS.primary} />
        <View style={style.inputContainer}>
              <TextInput
                placeholder="Location"
                style={{color: COLORS.grey,fontSize:18}}
              />
              <AntIcon name="down" size={20} />

            </View>
        <AntIcon name="shoppingcart" size={28} color={COLORS.primary} style={{marginLeft:240}}
          onPress={() => navigation.navigate('Cart')}

        />
        <Icon name="notifications-none" size={28} color={COLORS.primary}
                  onPress={() => navigation.navigate('Notifications')}

         />
       

      </View>
      
     
    
      
      <ScrollView showsVerticalScrollIndicator={true}>

      <Slide />

       <Text style={style.Title1}>Browse Category</Text>

        <ListCategories />

        <Text style={style.sectionTitle}>Most Popular</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />


          <Text style={style.sectionTitle}>More Shops</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={true}
            horizontal
            data={shops}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />

        </View>
      </ScrollView>
                {/* TabBottom Navigator Started */}
      

      <BottomTabNavigator/>
    </SafeAreaView>
  );
}

// Service Tabs
  const Serviced = ({}) => {
    const navigation = useNavigation(); 

  const ListCategories = () => {
    return (
      <View>

  <TouchableHighlight
  style={ServiceStyles.submit1}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Home')}  >

  
    <Text style={ServiceStyles.submitText}>All</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ServiceStyles.submit2}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Services')}  >
  <Text style={ServiceStyles.submitText1}>Services</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ServiceStyles.submit3}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Shops')}  >

    <Text style={ServiceStyles.submitText}>Shops</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ServiceStyles.submit4}  
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Stalls')}  >

    <Text style={ServiceStyles.submitText}>Stalls</Text>
</TouchableHighlight>
          </View>
        
      
    );
  };
    
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Shop Details')}
        >
        {/* Images Code */}
        <ImageBackground style={ServiceStyles.cardImage} source={place.image}>
          <View>
          <Ionics
          name="md-heart-circle-outline"
          color={COLORS.light}
          size={30}
          style={ServiceStyles.myheart}
          />
          </View>
          </ImageBackground>
  
  
          {/* for bottom text */}
       
          <View style={{
              backgroundColor:COLORS.white,
              paddingHorizontal:6,
              height: 70,
              width: (width / 2),
              borderBottomLeftRadius:5,
              borderBottomRightRadius:5,
              borderColor:COLORS.dark,
              borderWidth:.5,
              backgroundColor:COLORS.white,
              justifyContent: 'space-between',
              flexDirection: 'row',
              
              }}>

            <View style={{flexDirection:'column',justifyContent:"center"}}>

            <Text style={{
              color: COLORS.dark,
              fontSize: 18,
              fontWeight: 'bold',
              paddingHorizontal:15,
              paddingBottom:2,
                          }}>
            {place.name}
            </Text>

            <View style={{flexDirection:"row"}}>
            
              <Icon name="place" size={20} color={COLORS.dark} />
              <Text style={{marginLeft: 5, color: COLORS.dark}}>
                {place.location}
              </Text>

              <View style={{flex:1,flexDirection:"row-reverse"}}>
              <Icon name="star" size={15} color={COLORS.dark}   />
              </View>

              <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

            </View>
            

               
          </View>

          </View>
      </TouchableOpacity>
    );
  };

  
  const images = [
    {
      image: require("../../assets/images/search.jpg")
    },
    {
      image: require("../../assets/images/shop.jpg")
    },
    {
      image: require("../../assets/images/pay.jpg")
    },
    {
      image: require("../../assets/images/deliver.jpg")
    },
  ]
  
  // MoreShops Section
  const RecommendedCard = ({place}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Shop Details')}
      >
      {/* Images Code */}
      <ImageBackground style={ServiceStyles.cardImage} source={place.image}>
        <View>
        <Ionics
        name="md-heart-circle-outline"
        color={COLORS.light}
        size={30}
        style={ServiceStyles.myheart}
        />
        </View>
        </ImageBackground>


        {/* for bottom text */}
     
        <View style={{
            backgroundColor:COLORS.white,
            paddingHorizontal:6,
            height: 70,
            width: (width / 2),
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            borderColor:COLORS.dark,
            borderWidth:.5,
            backgroundColor:COLORS.white,
            justifyContent: 'space-between',
            flexDirection: 'row',
            
            }}>

          <View style={{flexDirection:'column',justifyContent:"center"}}>

          <Text style={{
            color: COLORS.dark,
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom:2,
                        }}>
          {place.name}
          </Text>

          <View style={{flexDirection:"row"}}>
          
            <Icon name="place" size={20} color={COLORS.dark} />
            <Text style={{marginLeft: 5, color: COLORS.dark}}>
              {place.location}
            </Text>

            <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Icon name="star" size={15} color={COLORS.dark}   />
            </View>

            <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

          </View>
          

             
        </View>

        </View>
    </TouchableOpacity>
    );
  };


  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
     
      <StatusBar translucent={false} backgroundColor={COLORS.dark} />
     
      <View style={ServiceStyles.header}>
        <Icon name="format-align-justify" size={28} color={COLORS.primary} />
        <View style={ServiceStyles.inputContainer}>
              <TextInput
                placeholder="Location"
                style={{color: COLORS.grey,fontSize:18}}
              />
              <AntIcon name="down" size={20} />

            </View>
            <AntIcon name="shoppingcart" size={28} color={COLORS.primary} style={{marginLeft:240}}
          onPress={() => navigation.navigate('Cart')}

        />
        <Icon name="notifications-none" size={28} color={COLORS.primary}
                  onPress={() => navigation.navigate('Notifications')}

         />
       

      </View>
      
     
    
      
      <ScrollView showsVerticalScrollIndicator={true}>
       {/* yahan slider image dalna hai */}
       <Slide/>

       <Text style={ServiceStyles.Title1}>Browse Category</Text>

        <ListCategories />

        <Text style={ServiceStyles.sectionTitle}>Most Popular</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />


          <Text style={ServiceStyles.sectionTitle}>More Services</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={true}
            horizontal
            data={shops}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />

        </View>
      </ScrollView>
      
          {/* TabBottom Navigator Started */}
       <BottomTabNavigator/>
    </SafeAreaView>
  );
}

//Shops Tabs
  const Shops = ({}) => {
    const navigation = useNavigation(); 

  const ListCategories = () => {
    return (
      <View>

  <TouchableHighlight
  style={ShopStyle.submit1}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Home')}  >

  
    <Text style={ShopStyle.submitText}>All</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ShopStyle.submit2}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Services')}  >
  <Text style={ShopStyle.submitText}>Services</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ShopStyle.submit3}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Shops')}  >

    <Text style={ShopStyle.submitText1}>Shops</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={ShopStyle.submit4}  
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Stalls')}  >

    <Text style={ShopStyle.submitText}>Stalls</Text>
</TouchableHighlight>
          </View>
        
      
    );
  };
    
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Shop Details')}
        >
        {/* Images Code */}
        <ImageBackground style={ShopStyle.cardImage} source={place.image}>
          <View>
          <Ionics
          name="md-heart-circle-outline"
          color={COLORS.light}
          size={30}
          style={ShopStyle.myheart}
          />
          </View>
          </ImageBackground>
  
  
          {/* for bottom text */}
       
          <View style={{
              backgroundColor:COLORS.white,
              paddingHorizontal:6,
              height: 70,
              width: (width / 2),
              borderBottomLeftRadius:5,
              borderBottomRightRadius:5,
              borderColor:COLORS.dark,
              borderWidth:.5,
              backgroundColor:COLORS.white,
              justifyContent: 'space-between',
              flexDirection: 'row',
              
              }}>

            <View style={{flexDirection:'column',justifyContent:"center"}}>

            <Text style={{
              color: COLORS.dark,
              fontSize: 18,
              fontWeight: 'bold',
              paddingHorizontal:15,
              paddingBottom:2,
                          }}>
            {place.name}
            </Text>

            <View style={{flexDirection:"row"}}>
            
              <Icon name="place" size={20} color={COLORS.dark} />
              <Text style={{marginLeft: 5, color: COLORS.dark}}>
                {place.location}
              </Text>

              <View style={{flex:1,flexDirection:"row-reverse"}}>
              <Icon name="star" size={15} color={COLORS.dark}   />
              </View>

              <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

            </View>
            

               
          </View>

          </View>
      </TouchableOpacity>
    );
  };

  
  const images = [
    {
      image: require("../../assets/images/search.jpg")
    },
    {
      image: require("../../assets/images/shop.jpg")
    },
    {
      image: require("../../assets/images/pay.jpg")
    },
    {
      image: require("../../assets/images/deliver.jpg")
    },
  ]
  
  // MoreShops Section
  const RecommendedCard = ({place}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Shop Details')}
      >
      {/* Images Code */}
      <ImageBackground style={ShopStyle.cardImage} source={place.image}>
        <View>
        <Ionics
        name="md-heart-circle-outline"
        color={COLORS.light}
        size={30}
        style={ShopStyle.myheart}
        />
        </View>
        </ImageBackground>


        {/* for bottom text */}
     
        <View style={{
            backgroundColor:COLORS.white,
            paddingHorizontal:6,
            height: 70,
            width: (width / 2),
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            borderColor:COLORS.dark,
            borderWidth:.5,
            backgroundColor:COLORS.white,
            justifyContent: 'space-between',
            flexDirection: 'row',
            
            }}>

          <View style={{flexDirection:'column',justifyContent:"center"}}>

          <Text style={{
            color: COLORS.dark,
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom:2,
                        }}>
          {place.name}
          </Text>

          <View style={{flexDirection:"row"}}>
          
            <Icon name="place" size={20} color={COLORS.dark} />
            <Text style={{marginLeft: 5, color: COLORS.dark}}>
              {place.location}
            </Text>

            <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Icon name="star" size={15} color={COLORS.dark}   />
            </View>

            <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

          </View>
          

             
        </View>

        </View>
    </TouchableOpacity>
    );
  };


  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
     
      <StatusBar translucent={false} backgroundColor={COLORS.dark} />
     
      <View style={ShopStyle.header}>
        <Icon name="format-align-justify" size={28} color={COLORS.primary} />
        <View style={ShopStyle.inputContainer}>
              <TextInput
                placeholder="Location"
                style={{color: COLORS.grey,fontSize:18}}
              />
              <AntIcon name="down" size={20} />

            </View>
            <AntIcon name="shoppingcart" size={28} color={COLORS.primary} style={{marginLeft:240}}
          onPress={() => navigation.navigate('Cart')}

        />
        <Icon name="notifications-none" size={28} color={COLORS.primary}
                  onPress={() => navigation.navigate('Notifications')}

         />
       

      </View>
      
     
    
      
      <ScrollView showsVerticalScrollIndicator={true}>
       {/* yahan slider image dalna hai */}
       <Slide/>

       <Text style={ShopStyle.Title1}>Browse Category</Text>

        <ListCategories />

        <Text style={ShopStyle.sectionTitle}>Most Popular</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />


          <Text style={ShopStyle.sectionTitle}>More Shops</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={true}
            horizontal
            data={shops}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />

        </View>
      </ScrollView>
      
          {/* TabBottom Navigator Started */}
            
    <BottomTabNavigator/>
    </SafeAreaView>
  );
};

//Stall Tabs
  const Stalled = ({}) => {
    const navigation = useNavigation(); 

  const ListCategories = () => {
    return (
      <View>

  <TouchableHighlight
  style={StallsStyle.submit1}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Home')}  >

  
    <Text style={StallsStyle.submitText}>All</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={StallsStyle.submit2}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Services')}  >
  <Text style={StallsStyle.submitText}>Services</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={StallsStyle.submit3}
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Shops')}  >

    <Text style={StallsStyle.submitText}>Shops</Text>
</TouchableHighlight>

 <TouchableHighlight
  style={StallsStyle.submit4}  
  underlayColor="#DDDDDD"
  onPress={() => navigation.replace('Stalls')}  >

    <Text style={StallsStyle.submitText1}>Stalls</Text>
</TouchableHighlight>
          </View>
        
      
    );
  };
    
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Shop Details')}
        >
        {/* Images Code */}
        <ImageBackground style={StallsStyle.cardImage} source={place.image}>
          <View>
          <Ionics
          name="md-heart-circle-outline"
          color={COLORS.light}
          size={30}
          style={StallsStyle.myheart}
          />
          </View>
          </ImageBackground>
  
  
          {/* for bottom text */}
       
          <View style={{
              backgroundColor:COLORS.white,
              paddingHorizontal:6,
              height: 70,
              width: (width / 2),
              borderBottomLeftRadius:5,
              borderBottomRightRadius:5,
              borderColor:COLORS.dark,
              borderWidth:.5,
              backgroundColor:COLORS.white,
              justifyContent: 'space-between',
              flexDirection: 'row',
              
              }}>

            <View style={{flexDirection:'column',justifyContent:"center"}}>

            <Text style={{
              color: COLORS.dark,
              fontSize: 18,
              fontWeight: 'bold',
              paddingHorizontal:15,
              paddingBottom:2,
                          }}>
            {place.name}
            </Text>

            <View style={{flexDirection:"row"}}>
            
              <Icon name="place" size={20} color={COLORS.dark} />
              <Text style={{marginLeft: 5, color: COLORS.dark}}>
                {place.location}
              </Text>

              <View style={{flex:1,flexDirection:"row-reverse"}}>
              <Icon name="star" size={15} color={COLORS.dark}   />
              </View>

              <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

            </View>
            

               
          </View>

          </View>
      </TouchableOpacity>
    );
  };

  
  const images = [
    {
      image: require("../../assets/images/search.jpg")
    },
    {
      image: require("../../assets/images/shop.jpg")
    },
    {
      image: require("../../assets/images/pay.jpg")
    },
    {
      image: require("../../assets/images/deliver.jpg")
    },
  ]
  
 // MoreShops Section
  const RecommendedCard = ({place}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Shop Details')}
      >
      {/* Images Code */}
      <ImageBackground style={StallsStyle.cardImage} source={place.image}>
        <View>
        <Ionics
        name="md-heart-circle-outline"
        color={COLORS.light}
        size={30}
        style={StallsStyle.myheart}
        />
        </View>
        </ImageBackground>


        {/* for bottom text */}
     
        <View style={{
            backgroundColor:COLORS.white,
            paddingHorizontal:6,
            height: 70,
            width: (width / 2),
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            borderColor:COLORS.dark,
            borderWidth:.5,
            backgroundColor:COLORS.white,
            justifyContent: 'space-between',
            flexDirection: 'row',
            
            }}>

          <View style={{flexDirection:'column',justifyContent:"center"}}>

          <Text style={{
            color: COLORS.dark,
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom:2,
                        }}>
          {place.name}
          </Text>

          <View style={{flexDirection:"row"}}>
          
            <Icon name="place" size={20} color={COLORS.dark} />
            <Text style={{marginLeft: 5, color: COLORS.dark}}>
              {place.location}
            </Text>

            <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Icon name="star" size={15} color={COLORS.dark}   />
            </View>

            <Text style={{marginLeft: 5, color: COLORS.dark}}>5.0</Text>

          </View>
          

             
        </View>

        </View>
    </TouchableOpacity>
    );
  };


  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
     
      <StatusBar translucent={false} backgroundColor={COLORS.dark} />
     
      <View style={StallsStyle.header}>
        <Icon name="format-align-justify" size={28} color={COLORS.primary} />
        <View style={StallsStyle.inputContainer}>
              <TextInput
                placeholder="Location"
                style={{color: COLORS.grey,fontSize:18}}
              />
              <AntIcon name="down" size={20} />

            </View>
            <AntIcon name="shoppingcart" size={28} color={COLORS.primary} style={{marginLeft:240}}
          onPress={() => navigation.navigate('Cart')}

        />
        <Icon name="notifications-none" size={28} color={COLORS.primary}
                  onPress={() => navigation.navigate('Notifications')}

         />
       

      </View>
      
     
    
      
      <ScrollView showsVerticalScrollIndicator={true}>
       {/* yahan slider image dalna hai */}
       <Slide />

       <Text style={StallsStyle.Title1}>Browse Category</Text>

        <ListCategories />

        <Text style={StallsStyle.sectionTitle}>Most Popular</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />


          <Text style={StallsStyle.sectionTitle}>More Stalls</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={true}
            horizontal
            data={shops}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />

        </View>
      </ScrollView>
      
          {/* TabBottom Navigator Started */}
            
    <BottomTabNavigator/>
    </SafeAreaView>
  );
};

//Style for All Tabs
const style = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft:"28%"
  },
  inputContainer: {
    height: 40,
    width: '65%',
    marginLeft:"13%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 12,
    
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:-37,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  Title1: {
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 120,
    width: width / 2,
    marginRight: 20,
    justifyContent:"center",
    padding: 10,
    borderRadius: 10,
  },
  
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  submit1:{
    marginLeft:5,
    marginTop:10,
    backgroundColor:"#bfbfbf",
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80
  },
  submitText1:{
    color:'#fff',
    textAlign:'center',
    fontSize:18
},
  submit2:{
    marginRight:40,
    marginLeft:90,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submit3:{
    marginRight:40,
    marginLeft:180,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submit4:{
    marginRight:40,
    marginLeft:270,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submitText:{
      color:'#c3c8c9',
      textAlign:'center',
      fontSize:18

  },
  myheart:{
    marginTop:-52,
    marginLeft: 130
  },
 
});

//Style for Shops Tabs
const ShopStyle = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft:"28%"
  },
  inputContainer: {
    height: 40,
    width: '65%',
    marginLeft:"13%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 12,
    
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:-37,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  Title1: {
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 120,
    width: width / 2,
    marginRight: 20,
    justifyContent:"center",
    padding: 10,
    borderRadius: 10,
  },
  
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  submit1:{
    marginLeft:5,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80
  },
  submitText1:{
    color:'#fff',
    textAlign:'center',
    fontSize:18
},
  submit2:{
    marginRight:40,
    marginLeft:90,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',

    width:80

  },
  submit3:{
    marginRight:40,
    marginLeft:180,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    backgroundColor:"#bfbfbf",

    width:80

  },
  submit4:{
    marginRight:40,
    marginLeft:270,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submitText:{
      color:'#c3c8c9',
      textAlign:'center',
      fontSize:18

  },
  myheart:{
    marginTop:-52,
    marginLeft: 130
  },
 
});

//Style for Service Tabs
const ServiceStyles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft:"28%"
  },
  inputContainer: {
    height: 40,
    width: '65%',
    marginLeft:"13%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 12,
    
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:-37,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  Title1: {
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 120,
    width: width / 2,
    marginRight: 20,
    justifyContent:"center",
    padding: 10,
    borderRadius: 10,
  },
  
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  submit1:{
    marginLeft:5,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80
  },
  submitText1:{
    color:'#fff',
    textAlign:'center',
    fontSize:18
},
  submit2:{
    marginRight:40,
    marginLeft:90,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    backgroundColor:"#bfbfbf",

    width:80

  },
  submit3:{
    marginRight:40,
    marginLeft:180,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submit4:{
    marginRight:40,
    marginLeft:270,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80

  },
  submitText:{
      color:'#c3c8c9',
      textAlign:'center',
      fontSize:18

  },
  myheart:{
    marginTop:-52,
    marginLeft: 130
  },
 
});

//Style for Stall Tabs
const StallsStyle = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft:"28%"
  },
  inputContainer: {
    height: 40,
    width: '65%',
    marginLeft:"13%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 12,
    
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:-37,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  Title1: {
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 120,
    width: width / 2,
    marginRight: 20,
    justifyContent:"center",
    padding: 10,
    borderRadius: 10,
  },
  
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  submit1:{
    marginLeft:5,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width:80
  },
  submitText1:{
    color:'#fff',
    textAlign:'center',
    fontSize:18
},
  submit2:{
    marginRight:40,
    marginLeft:90,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',

    width:80

  },
  submit3:{
    marginRight:40,
    marginLeft:180,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',

    width:80

  },
  submit4:{
    marginRight:40,
    marginLeft:270,
    marginTop:-43,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    backgroundColor:"#bfbfbf",

    width:80

  },
  submitText:{
      color:'#c3c8c9',
      textAlign:'center',
      fontSize:18

  },
  myheart:{
    marginTop:-52,
    marginLeft: 130
  },
 
});

//Styles for AddShop Function
const styles = StyleSheet.create({
  shopNameView: {
    padding: 2,
  },
  shopName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  btns: {
    marginTop: 5,
  },
  shopImg: {
    width: 150,
    height: 85,
    resizeMode: 'stretch',
  },
  shopAdder: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 600,
  },
  modalToggle: {
    backgroundColor: 'rgba(28,28,28, 0.8)',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 50,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    borderRadius: 40,
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
  },
  modalClose: {
    marginTop: 20,
    padding: 8,
    marginBottom: 0,
    color: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    alignSelf: 'flex-end',
    width: 35,
    height: 35,
  },
  modalContent: {
    flex: 1,
  },
  h2Style: {
    paddingLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  allShops: {
    paddingLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  submit1: {
    marginLeft: 5,
    marginTop: 10,
    backgroundColor: "#bfbfbf",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width: 80
  },
  submitText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  submit2: {
    marginRight: 40,
    marginLeft: 90,
    marginTop: -43,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width: 80

  },
  submit3: {
    marginRight: 40,
    marginLeft: 180,
    marginTop: -43,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width: 80

  },
  submit4: {
    marginRight: 40,
    marginLeft: 270,
    marginTop: -43,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6edf0',
    width: 80

  },
  submitText: {
    color: '#c3c8c9',
    textAlign: 'center',
    fontSize: 18

  },
  storelist: {
    // marginTop: 5,
  },
  singleShop: {
    marginHorizontal: 5,
  },
});