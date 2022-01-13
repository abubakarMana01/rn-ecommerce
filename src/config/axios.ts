import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sad-ecommerce.herokuapp.com',
});

export default instance;
