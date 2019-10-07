import axios from 'axios';

const API_URL = 'https://uifaces.co/api';
const API_KEY = '2d59ead5e475d494933aec3d1f5b49';

const getAvatar = async ()=>{
    const res = await axios.get(API_URL,{
        headers:{
            'X-API-KEY':API_KEY,
        },
        params:{
            'limit':1,
            'random':true
        }
    });
    const {photo} = res.data[0];
    console.log("Photo is:", photo);
    console.log('type of photo is: ', typeof photo);
    console.dir(res);
    return photo; 
}

export default getAvatar;