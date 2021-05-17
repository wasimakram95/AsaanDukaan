import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Image, Platform } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from "../../Shared/button";
import * as ImagePicker from 'expo-image-picker';

const reviewSchema = yup.object({
  name: yup.string()
    .required()
    .min(4),
    longitude: yup.number()
    .required(),
    latitude: yup.number()
    .required(),
  // rating: yup.string()
  //   .required()
  //   .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
  //     return parseInt(val) < 6 && parseInt(val) > 0;
  //   }),
});

export default function AddShopForm({ addReview }) {

  const categories = [
    { id: 1, value: "Food" },
    { id: 2, value: "Grocery" },
    { id: 3, value: "Service" },
    { id: 4, value: "Medicine" },
    { id: 5, value: "Bakers" },
  ];

  const [ShopCategories, setShopCategories] = useState(categories);

  const renderShopCategories = () => {
    return ShopCategories.map((name, i) => {
      return <Text key={name}>{name}</Text>
    });
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {

      //setImage(result.uri);
      var localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    }
  }
  return (

    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: '', longitude: 0 , latitude: 0 , _type: ''}}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addReview(values);
          
        }}

      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Shop Name'
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur('name')}
              value={props.values.name}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

            <TextInput
              style={globalStyles.input}
              keyboardType = 'number-pad'
              placeholder='Shop Longitude'
              onChangeText={props.handleChange('longitude')}
              onBlur={props.handleBlur('longitude')}
              value={props.values.longitude}
            />
            <Text style={globalStyles.errorText}>{props.touched.longitude && props.errors.longitude}</Text>

            <Dropdown
              style={styles.dropdown}
              label="Shop Categories"
              data={categories}
              onChangeText={props.handleChange('_type')}
              // onBlur={props.handleBlur('_type')}
              value={props.values._type}
            />
            {/* { renderShopCategories() } */}

            <TextInput
              style={globalStyles.input}
              placeholder='Shop Latitude'
              keyboardType = 'number-pad'
              onChangeText={props.handleChange('latitude')}
              onBlur={props.handleBlur('latitude')}
              value={props.values.latitude}
            />
            <Text style={globalStyles.errorText}>{props.touched.latitude && props.errors.latitude}</Text>


            {/* <TextInput
              style={globalStyles.input}
              placeholder='Image URI'
              multiline minHeight={60}
              onChangeText={props.handleChange('imageURI')}
              onBlur={props.handleBlur('imageURI')}
              value={props.values.imageURI}
            /> */}

            <FlatButton onPress={props.handleSubmit} text='Add Shop' />
          </View>
        )}
      </Formik>
    </View>

  );
}

const styles = StyleSheet.create({
  dropdown: {
    fontSize: 18,
    borderRadius: 6,
    flex: 1,
    flexDirection: 'column'
  },
  imageUplaoder: {
    marginBottom: 10,
    borderRadius: 20
  }
});