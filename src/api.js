import axios from 'axios';
import {ActionCreator} from './reducers/data/data';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onErrorr = (err) => {
    if (err.response.status === 403) {
      // console.log(`Доступ ограничен статус 403`);
      dispatch(ActionCreator.loadErrorScreen());
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onErrorr);

  return api;
};
