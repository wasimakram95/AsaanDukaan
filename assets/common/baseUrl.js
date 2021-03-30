import { Platform } from 'react-native'


let baseURL = '';
// baseURL='http://192.168.0.110:3000'
{Platform.OS == 'android'
? baseURL = 'https://asaan-dukaan-back.herokuapp.com'
: baseURL = 'https://asaan-dukaan-back.herokuapp.com'

}

export default baseURL;
