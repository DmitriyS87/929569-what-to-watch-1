import axios from 'axios';

export function createAPI(onLoginFail) {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onErrorr = (err) => {
    if (err.response.status === 403) {
      onLoginFail();
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onErrorr);

  return api;
}
