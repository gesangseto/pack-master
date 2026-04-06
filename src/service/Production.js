import $axios from '../configuration/axios';
let url = '/api/v4.1/production/process-order';

export const getPO = async (param = Object) => {
  var query_string = '';
  if (param) {
    query_string = new URLSearchParams(param).toString();
  }
  return new Promise((resolve) => {
    $axios
      .get(`${url}/station?${query_string}`)
      .then((result) => {
        // console.log(result);
        let _data = result.data;
        return resolve(_data);
      })
      .catch((e) => {
        return resolve(false);
      });
  });
};

export const getAvalaibleSerial = async (param = Object) => {
  var query_string = '';
  if (param) {
    query_string = new URLSearchParams(param).toString();
  }
  return new Promise((resolve) => {
    $axiosMertrack
      .get(`${url}/avalaible-serial?${query_string}`)
      .then((result) => {
        let res = result.data;
        return resolve(res);
      })
      .catch((e) => {
        console.log('ERROR => ', e);
        return resolve(false);
      });
  });
};

export const confirmPO = async (param = Object) => {
  if (!param) {
    return false;
  }
  return new Promise((resolve) => {
    $axiosMertrack
      .post(`${url}/confirmation`, param)
      .then((result) => {
        let res = result.data;
        return resolve(res);
      })
      .catch((e) => {
        console.log('ERROR => ', e);
        return resolve(false);
      });
  });
};
