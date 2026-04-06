import axios from 'axios';
import { stationAuthStore } from '../store/authStore';

const $axios = axios.create();
$axios.defaults.timeout = 120000;
$axios.interceptors.request.use(
  async (config) => {
    config.baseURL = 'http://127.0.0.1:3002/';
    config.headers = {
      'Content-Type': 'application/json',
      'User-Type': 'station',
      lang: 'id',
      'mertrackapi-token': stationAuthStore.getState().token,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(
  async (response) => {
    let res = response.data;
    if (res.hasOwnProperty('status_code') && res.status_code == 401) {
    }
    return Promise.resolve(response);
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

export default $axios;
