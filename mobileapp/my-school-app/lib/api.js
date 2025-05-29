import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.8.138:8000/api/', // or your ngrok URL
});

export default api;
