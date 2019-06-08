import axios from 'axios';

export const createAPI = (onError) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onErrorr = (err) => {
    if (err.status === 403) {
      onError(`Доступ ограничен статус 403`);
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onErrorr);

  return api;
};
