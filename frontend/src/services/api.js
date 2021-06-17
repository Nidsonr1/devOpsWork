import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.94.10.56:3333/',
});

export default api;
