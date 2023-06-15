import axios from 'axios';

export const luxandAPI = axios.create({
  baseURL: 'https://api.luxand.cloud',
  timeout: 5000,
  headers: {
    token: '05f8fa5c65844678b5a2d7473a810e88',
  },
});
