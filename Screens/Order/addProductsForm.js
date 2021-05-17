import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Image, Platform } from 'react-native';
import { globalStyles } from '../../styles/global';
import { connect, Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import * as ImagePicker from 'expo-image-picker';

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

export default function AddProductForm({ addProduct }) {


    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {

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
                initialValues={{ name: '', unit: 0, quantity: 0, price_per_unit: ''}}
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

                        {/* <TextInput
                            style={globalStyles.input}
                            placeholder='Image URI'
                            onChangeText={props.handleChange('imageURI')}
                            onBlur={props.handleBlur('imageURI')}
                            value= {props.values.imageURI}
                        /> */}
                        <View style={styles.imagePicker}>
                            <Button style={styles.imagePickerBtn} onPress={PickImage} title='Add Product Image' />
                        </View>


                        <FlatButton onPress={props.handleSubmit} text='Add Product' />
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
    },
    imagePicker: {
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    imagePickerBtn: {
        borderRadius: 20,
    }
});