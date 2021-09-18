import axios from 'axios';

const api = axios.create(
  {
    baseURL: `http://45.159.196.58:7474/api/v1/`
  }
);

api.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': "Bearer " + localStorage.getItem('Token'),
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

export default api;

