import axios from 'axios';
import LocalStorageService from '../services/localStorage';

axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes('/login')) {
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

export default axios;
