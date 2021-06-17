import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.94.184.84:3333/',
});

export default api;
