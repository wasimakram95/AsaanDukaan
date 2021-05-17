import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback,
  Keyboard, Button, TextInput, FlatList, TouchableOpacity, Linking, Platform, ToastAndroid
} from 'react-native';
import { globalStyles, images } from '../../styles/global';

import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../Shared/card';
import FlatButton from '../../Shared/button.js';
import { connect, Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const reviewSchema = yup.object({
  name: yup.string()
    .required()
    .min(4),
  unit: yup.string()
    .required(),
  quantity: yup.number()
    .required(),
  price_per_unit: yup.number()
    .required(),
});

export default function ShopDetails({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  var localUri;
  const [products, setProducts] = useState([
    { imageURI: 'https://cdn.shopify.com/s/files/1/0081/3826/0561/products/8964000346327_1.jpg?v=1564325739', name: 'Olpers', unit: 'Carton', quantity: 5, price_per_unit: 1100, key: '1', rating: 4 },
    { imageURI: 'https://kandns.pk/images/social/kandnsnuggets.png', name: 'K&Ns Nuggets', unit: 'Box', quantity: 10, price_per_unit: 150, key: '2', rating: 5 },
    { imageURI: 'https://st2.depositphotos.com/1000348/6439/i/600/depositphotos_64399139-stock-photo-flour-and-wheat-ears.jpg', name: 'Flour', unit: 'kg', quantity: 55, price_per_unit: 75, key: '3', rating: 5 },
    { imageURI: 'https://image.shutterstock.com/image-photo/bottle-pouring-virgin-olive-oil-260nw-253044214.jpg', name: 'Oil', unit: 'Litre', quantity: 80, price_per_unit: 120, key: '4', rating: 4 },
    { imageURI: 'https://www.world-grain.com/ext/resources/Article-Images/2020/12/GMR_Rice_AdobeStock_64819529_E_Nov.jpg?1609338918', name: 'Rice', unit: 'kg', quantity: 45, price_per_unit: 100, key: '5', rating: 4 },
  ]);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {

      localUri = result.uri;

      console.log(localUri);
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    }
  }

  const addProduct = (product) => {
    console.log('shop detail ka console');
    console.log(localUri);
    console.log(product.name);
    console.log(product.unit);
    console.log(product.quantity);
    console.log(product.price_per_unit);

    /*let productData = {
      imageURI : localUri,
      name : product.name,
      unit : product.unit,
      quantity: product.quantity,
      price_per_unit: product.price_per_unit
    };
    var data = new FormData();
    data.append('productData', productData);

    axios.post(`https://asaan-dukaan-back.herokuapp.com/api/product/60576226424aad4630077f9f`, data, {
      headers: {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTViZDFmNzQ5MGI3NTI4NGIwYWVjYyIsImlhdCI6MTYxNjQ4Mjk2MX0.O_zWI74pCy2jmH0Exjb3gHrZjIol_Lnz6yh4OiJNWqk',
      },
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log('Error');
      console.log(err)
    });*/

    product.key = Math.random().toString();
    product.imageURI = localUri;
    setProducts((currentProducts) => {
      return [product, ...currentProducts];
    });
    setModalOpen(false);
  }



  addtoCartMessage = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Product added in Cart Successfully', ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }

  navigateToCart = () => {
    navigation.goBack();
    navigation.push('Cart');
  }

  return (
    <View style={globalStyles.container}>
      <FlatButton onPress={() => setModalOpen(true)} text='Add New Products' />
      <Text style={styles.allProducts}>All Products</Text>
      <View style={globalStyles.container}>
        <Modal visible={modalOpen} animationType='slide'>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons
                name='close'
                size={20}
                style={styles.modalClose}
                onPress={() => setModalOpen(false)}
              />
              <Text h2 style={styles.h2Style}>Add Product</Text>
              <View style={globalStyles.container}>
                <Formik
                  initialValues={{ name: '', unit: 0, quantity: 0, price_per_unit: '' }}
                  validationSchema={reviewSchema}
                  onSubmit={(values, actions) => {
                    actions.resetForm();
                    addProduct(values);

                  }}

                >
                  {props => (
                    <View>
                      <TextInput
                        style={globalStyles.input}
                        placeholder='Product Name'
                        onChangeText={props.handleChange('name')}
                        onBlur={props.handleBlur('name')}
                        value={props.values.name}
                      />
                      {/* only if the left value is a valid string, will the right value be displayed */}
                      <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

                      <TextInput
                        style={globalStyles.input}
                        placeholder='Product Unit'
                        onChangeText={props.handleChange('unit')}
                        onBlur={props.handleBlur('unit')}
                        value={props.values.unit}
                      />
                      <Text style={globalStyles.errorText}>{props.touched.unit && props.errors.unit}</Text>


                      <TextInput
                        style={globalStyles.input}
                        placeholder='Product Quantity'
                        keyboardType='number-pad'
                        onChangeText={props.handleChange('quantity')}
                        onBlur={props.handleBlur('quantity')}
                        value={props.values.quantity}
                      />
                      <Text style={globalStyles.errorText}>{props.touched.quantity && props.errors.quantity}</Text>


                      <TextInput
                        style={globalStyles.input}
                        placeholder='Product Price Per Unit'
                        keyboardType='number-pad'
                        onChangeText={props.handleChange('price_per_unit')}
                        onBlur={props.handleBlur('price_per_unit')}
                        value={props.values.price_per_unit}
                      />

                      <Text style={globalStyles.errorText}>{props.touched.price_per_unit && props.errors.price_per_unit}</Text>

                      <View style={styles.imagePicker}>
                        <Button style={styles.imagePickerBtn} onPress={PickImage} title='Upload Product Image' />
                      </View>
                      <FlatButton onPress={props.handleSubmit} text='Add Product' />
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <FlatList data={products} renderItem={({ item }) => (
          <TouchableOpacity>
            <Card>
              <Image
                style={styles.productImg}
                // source={item.imageSRC}
                source={{
                  uri: item.imageURI,
                }}
              />
              <View style={styles.block}>
                <View style={styles.block1}>
                  <Text style={globalStyles.titleText}>{item.name}</Text>
                  <Text>In Stock : {item.quantity + ' ' + item.unit}</Text>
                  <Text>Price : Rs. {item.price_per_unit + ' per ' + item.unit}</Text>
                  <View style={styles.rating}>
                    <Text>Rating: </Text>
                    <Image style={styles.rating} source={images.ratings[item.rating]} />
                  </View>
                </View>
                <View style={styles.block2}>
                  <MaterialIcons
                    name='add-shopping-cart'
                    size={30}
                    style={styles.cartButton}
                    onPress={() => addtoCartMessage()}
                  />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )} />
      </View>
      <TouchableOpacity onPress={() => navigateToCart()}>
        <View style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderBtnText}>Go to Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productImg: {
    height: 150,
    width: 270,
    resizeMode: 'stretch',
  },
  rating: {
    flexDirection: 'row',
    height: 18,
    width: 100,
  },
  block: {
    flex: 3,
    flexDirection: 'row',
  },
  block1: {
    flex: 2,
  },
  block2: {
    flex: 1,
  },
  allProducts: {
    fontSize: 30,
    paddingTop: 10,
    fontWeight: 'bold',
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
    padding: 10,
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  dropdown: {
    fontSize: 18,
    borderRadius: 6,
    flex: 1,
    flexDirection: 'column'
  },
  imageUplaoder: {
    marginBottom: 10,
    borderRadius: 20
  },
  imagePicker: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  imagePickerBtn: {
    borderRadius: 20,
  },
  cartButton: {
    backgroundColor: 'rgba(28,28,28, 0.8)',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    borderRadius: 40,
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
  },
  placeOrderBtn: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
  },
  placeOrderBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'center',
  },
});