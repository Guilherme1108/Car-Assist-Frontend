import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carassist-backend-f3h6b8b7bjeshrhr.brazilsouth-01.azurewebsites.net/v1/car-assist'
});

export default api;