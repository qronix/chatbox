const axios = require('axios');

const API_URL = 'https://uifaces.co/api';
const API_KEY = '2d59ead5e475d494933aec3d1f5b49';

const getUser = async ()=>{
    const res = await axios.get(API_URL,{
        headers:{
            'X-API-KEY':API_KEY,
        },
        params:{
            'limit':1,
            'random':true
        }
    });
    const {photo, name} = res.data[0];
    const firstName = getFirstName(name);
    return {photo, name:firstName}; 
}

const getFirstName = name => (name.split(' ')[0]);

module.exports = {
    getUser
};