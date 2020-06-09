import axios from 'axios'

const httpClient = axios.create({
  baseURL: `https://nameless-ocean-36255.herokuapp.com`,
  // baseURL: `http://localhost:3000`,
  headers: {
    'content-type': 'application/json',
    // 'secret-key': CONFIG.SECRET_KEY
  }
});

export default httpClient;
