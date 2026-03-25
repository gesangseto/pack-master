import axios from 'axios';

const $axios = axios.create();
$axios.defaults.timeout = 120000;
$axios.interceptors.request.use(
  async (config) => {
    config.baseURL = 'http://127.0.0.1:3002/';
    config.headers = {
      'Content-Type': 'application/json',
      'user-Type': 'Station',
      lang: 'id',
      //   'mertrackapi-token': 'c71d88f3-e144-49c9-91df-d9a6bd0e3414',
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
