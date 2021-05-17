import React, { useState } from 'react';
import {
    StyleSheet, View, Text, Image, Modal, TouchableWithoutFeedback,
    Keyboard, Button, TextInput, FlatList, TouchableOpacity, Linking, Platform, ToastAndroid
} from 'react-native';
import { globalStyles, images } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../../Shared/card';
import FlatButton from '../../Shared/button.js';
import ShopHeader from '../../Shared/secondHeader';

export default function Cart({ navigation }) {
    const [products, setProducts] = useState([
        { imageURI: 'https://cdn.shopify.com/s/files/1/0081/3826/0561/products/8964000346327_1.jpg?v=1564325739', name: 'Olpers', unit: 'Carton', quantity: 5, price_per_unit: 1100, key: '1', rating: 4 },
        { imageURI: 'https://kandns.pk/images/social/kandnsnuggets.png', name: 'K&Ns Nuggets', unit: 'Box', quantity: 10, price_per_unit: 150, key: '2', rating: 5 },
        { imageURI: 'https://st2.depositphotos.com/1000348/6439/i/600/depositphotos_64399139-stock-photo-flour-and-wheat-ears.jpg', name: 'Flour', unit: 'kg', quantity: 55, price_per_unit: 75, key: '3', rating: 5 },
        { imageURI: 'https://image.shutterstock.com/image-photo/bottle-pouring-virgin-olive-oil-260nw-253044214.jpg', name: 'Oil', unit: 'Litre', quantity: 80, price_per_unit: 120, key: '4', rating: 4 },
        { imageURI: 'https://www.world-grain.com/ext/resources/Article-Images/2020/12/GMR_Rice_AdobeStock_64819529_E_Nov.jpg?1609338918', name: 'Rice', unit: 'kg', quantity: 45, price_per_unit: 100, key: '5', rating: 4 },
    ]);

    dialCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            ToastAndroid.show('Order Placed Successfully', ToastAndroid.SHORT)
            phoneNumber = 'tel:${+1234567890}';
        }
        else {
            AlertIOS.alert(msg);
            phoneNumber = 'telprompt:${+1234567890}';
        }

        Linking.openURL(phoneNumber);
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.container}>
                <FlatList data={products} renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Card>
                            <Image
                                style={styles.productImg}
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
                                            name='remove'
                                            size={20}
                                            style={styles.sign} />
                                        <View style={styles.cartCount}>
                                            <Text>1</Text>
                                        </View>
                                        <MaterialIcons
                                            name='add'
                                            size={20}
                                            style={styles.sign} />
                                        <MaterialIcons 
                                        name='delete'
                                        size={20}
                                        style={styles.dustbin}/>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )} />
            </View>
            <TouchableOpacity onPress={() => dialCall()}>
                <View style={styles.placeOrderBtn}>
                    <Text style={styles.placeOrderBtnText}>Place Order</Text>
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
        flexDirection: 'row',
        marginTop: 60,
        marginRight: 10
    },
    sign: {
        backgroundColor: 'rgba(28, 28, 28, 0.8)',
        borderRadius: 15,
        height: 20,
        color: 'white',
    },
    cartCount: {
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height: 20,
        width: 20,
        justifyContent: 'center',
        paddingLeft: 7,
        marginLeft: 10,
        marginRight: 10,
    },
    dustbin: {
        marginLeft: 10,
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