import axios from 'axios';
import LocalStorageService from '../services/localStorage';
import { BASE_BACKEND_URL } from './constants';
// import {history} from 'react-router-dom'

axios.defaults.baseURL = BASE_BACKEND_URL;

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes('/login') || config.url.includes('/register')) {
      return config;
    }

    const token = LocalStorageService.getToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    throw err;
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log('err');
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default axios;
