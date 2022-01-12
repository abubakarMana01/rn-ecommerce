import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.189.136:5000',
});

export default instance;
