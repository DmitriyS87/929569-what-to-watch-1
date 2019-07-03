import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
// import {getErrorMessage} from '../../utils/get-error-message';
import {ActionType, Operation} from './user';

Enzyme.configure({adapter: new Adapter()});

it(`USER reducer correctly make a correct API call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock.onPost(`/login`).reply(200, {fake: true});

  return userLoader(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.SET_USER_DATA,
      data: {fake: true},
    });
  });
});

it(`USER reducer correctly use a correct action on wrong call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock.onPost(`/login`).reply(350, {response: {status: 350, statusText: `test`}});

  return userLoader(dispatch, jest.fn(), api).catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.LOGIN_ERROR,
      errorMessage: `Непредвиденная ошибка: 350 details: test`,
    });
  });
});

it(`USER reducer correctly use a correct action on wrong code 400 call to /login`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const userLoader = Operation.tryLogin();

  apiMock.onPost(`/login`).reply(400, {response: {status: 400, statusText: `test`}});

  return userLoader(dispatch, jest.fn(), api).catch(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.LOGIN_ERROR,
      errorMessage: `We can’t recognize this email and password combination. Please try again.`,
    });
  });
});
