import axios from 'axios';
import history from './history.js';

export function createAPI() {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onErrorr = (err) => {
    if (err.response.status === 403) {
      history.push(`/login`);
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onErrorr);

  return api;
}
