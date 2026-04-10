import axios from 'axios';
import { useConfig } from '../store/configStore';
import { showGlobalAlert } from '../component/AlertProvider';
const $axios = axios.create();
$axios.defaults.timeout = 120000;
$axios.interceptors.request.use(
  async (config) => {
    let appConfig = useConfig.getState().config;
    console.log(appConfig);

    config.baseURL = `http://${appConfig?.ip_server}:${appConfig?.port_server}/`;
    config.headers = {
      'Content-Type': 'application/json',
      'User-Type': 'station',
      lang: 'id',
      // 'mertrackapi-token': stationAuthStore.getState().token,
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
    showGlobalAlert(`${error.message}`, 'error');
    console.log('AWWW', `${error.message}`);
    console.log('===================');

    return Promise.reject(error);
  },
);

export default $axios;
