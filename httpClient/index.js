import axios from 'axios'

const httpClient = axios.create({
  // baseURL: `https://nameless-ocean-36255.herokuapp.com`,
  baseURL: `http://172.20.10.2:4201`,
  headers: {
    'content-type': 'application/json',
    // 'secret-key': CONFIG.SECRET_KEY
  }
});

export default httpClient;
