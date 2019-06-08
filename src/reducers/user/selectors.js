import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getErrorMessage = (state) => {
  return state[NAME_SPACE].errorMessage;
};
