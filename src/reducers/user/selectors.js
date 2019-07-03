import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getLoginStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationFailed;
};

export const getUserStatus = (state) => {
  return state[NAME_SPACE].isLogged;
};
