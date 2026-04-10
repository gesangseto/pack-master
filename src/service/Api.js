import $axios from '../configuration/axios';

export const getVersion = async () => {
  return new Promise((resolve) => {
    $axios
      .get(`/version`)
      .then((result) => {
        let _data = result.data;
        return resolve(_data);
      })
      .catch((e) => {
        return resolve(false);
      });
  });
};

export const getDocs = async () => {
  return new Promise((resolve) => {
    $axios
      .get(`/docs`)
      .then((result) => {
        let _data = result.data;
        return resolve(_data);
      })
      .catch((e) => {
        return resolve(false);
      });
  });
};
