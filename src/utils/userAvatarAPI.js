import axios from 'axios';

const API_URL = 'https://uifaces.co/api';
const API_KEY = '2d59ead5e475d494933aec3d1f5b49';

const getUser = async () => {
    const res = await axios.get(API_URL, {
        headers: {
            'X-API-KEY': API_KEY,
        },
        params: {
            'limit': 1,
            'random': true
        }
    });
    const {
        photo,
        name
    } = res.data[0];
    return {
        photo,
        name
    };
}

export default getUser;