import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.193.136:5000',
});

export default instance;
