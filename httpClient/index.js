import axios from 'axios'

const httpClient = axios.create({
  // baseURL: `https://nameless-ocean-36255.herokuapp.com`,
  baseURL: `http://192.168.31.5:4201`,
  headers: {
    'content-type': 'application/json',
    // 'secret-key': CONFIG.SECRET_KEY
  }
});

export default httpClient;
