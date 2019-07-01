import {checkStatusOk} from '../../utils/check-status';
import {getErrorMessage} from '../../utils/get-error-message';

const initialState = {
  isAuthorizationRequired: false,
  user: null,
  errorMessage: ``,
};

const ActionType = {
  REQUIRED_AUTORIZATION: `REQUIRED_AUTORIZATION`,
  LOGIN_SUCCESS: `LOGIN_SUCCESS`,
  LOGIN_ERROR: `LOGIN_ERROR`,
};

const ActionCreator = {
  checkUser: (status) => {
    return {
      type: ActionType.REQUIRED_AUTORIZATION,
      status,
    };
  },
  loginSuccess: (data) => {
    return {
      type: ActionType.LOGIN_SUCCESS,
      data,
    };
  },
  loginError: (errorMessage) => {
    return {
      type: ActionType.LOGIN_ERROR,
      errorMessage,
    };
  },
};

const Operation = {
  tryLogin: (userData) => (dispatch, _getState, api) => {
    return api.post(`/login`, userData).then((response) => {
      if (checkStatusOk(response)) {
        return dispatch(ActionCreator.loginSuccess(response.data));
      }
      return dispatch(ActionCreator.loginError(getErrorMessage(response)));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTORIZATION:
      return Object.assign({}, state, {isAuthorizationRequired: action.status});
    case ActionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {user: action.data}, {isAuthorizationRequired: false});
    case ActionType.LOGIN_ERROR:
      return Object.assign(
          {},
          state,
          {user: null},
          {isAuthorizationRequired: true},
          {errorMessage: action.errorMessage}
      );
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType, Operation, getErrorMessage};
