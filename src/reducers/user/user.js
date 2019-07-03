import {getErrorMessage} from '../../utils/get-error-message';

const initialState = {
  user: null,
  isAuthorizationFailed: false,
  isLogged: false,
  // errorMessage: ``,
};

const ActionType = {
  LOGIN_SUCCESS: `LOGIN_SUCCESS`,
  SET_USER_DATA: `SET_USER_DATA`,
  // LOGIN_ERROR: `LOGIN_ERROR`,
  IS_AUTHORIZATION_FAILED: `IS_AUTHORIZATION_FAILED`,
};

const ActionCreator = {
  loginSuccess: (status) => {
    return {
      type: ActionType.LOGIN_SUCCESS,
      status,
    };
  },
  // loginError: (errorMessage) => {
  //   return {
  //     type: ActionType.LOGIN_ERROR,
  //     errorMessage,
  //   };
  // },
  setAuthorizationFailedStatus: (status) => {
    return {
      type: ActionType.IS_AUTHORIZATION_FAILED,
      status,
    };
  },
  setUser: (data) => {
    return {
      type: ActionType.SET_USER_DATA,
      data,
    };
  },
};

const Operation = {
  tryLogin: (userData) => (dispatch, _getState, api) => {
    return api
      .post(`/login`, userData)
      .then((response) => {
        dispatch(ActionCreator.loginSuccess(true));
        dispatch(ActionCreator.setUser(response.data));
      })
      .catch(dispatch(ActionCreator.setAuthorizationFailedStatus(true)));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_AUTHORIZATION_FAILED:
      return Object.assign({}, state, {isAuthorizationFailed: action.status});
    case ActionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {isLogged: action.status});
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {user: action.data});
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType, Operation, getErrorMessage};
