import {getErrorMessage} from '../../utils/get-error-message';

const initialState = {
  user: null,
  errorMessage: ``,
};

const ActionType = {
  LOGIN_SUCCESS: `LOGIN_SUCCESS`,
  LOGIN_ERROR: `LOGIN_ERROR`,
};

const ActionCreator = {
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
    return api
      .post(`/login`, userData)
      .then((response) => {
        dispatch(ActionCreator.loginSuccess(response.data));
      })
      .catch((err) => dispatch(ActionCreator.loginError(getErrorMessage(err))));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {user: action.data});
    case ActionType.LOGIN_ERROR:
      return Object.assign({}, state, {user: null}, {errorMessage: action.errorMessage});
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType, Operation, getErrorMessage};
