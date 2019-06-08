import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';

import {ActionType, Operation, getErrorMessage} from './user';

Enzyme.configure({adapter: new Adapter()});

it(`USER reducer correctly make a correct API call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock
    .onPost(`/login`)
    .reply(200, {fake: true});

  return userLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOGIN_SUCCESS,
        data: {fake: true},
      });
    });
});

it(`USER reducer correctly use a correct action on wrong call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock
    .onPost(`/login`)
    .reply(300, {});

  return userLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOGIN_ERROR,
        errorMessage: getErrorMessage({}),
      });
    });
});

it(`USER reducer correctly use a correct action on wrong code 400 call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock
    .onPost(`/login`)
    .reply(400, {});

  return userLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOGIN_ERROR,
        errorMessage: getErrorMessage({}),
      });
    });
});
