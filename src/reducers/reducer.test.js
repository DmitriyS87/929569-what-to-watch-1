import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api';

import {reducer, ActionCreator, ActionType, Operation} from './reducer';

import TEST_MOCKS from '../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`reducer correctly update state by changeGenre`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: TEST_MOCKS.films,
  }, ActionCreator.changeGenre(`Adventure`))).toEqual({
    genre: `Adventure`,
    movies: TEST_MOCKS.films,
  });
});

it(`Should make a correct API call to /films`, function () {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const filmsLoader = Operation.loadMovies();

  apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);

  return filmsLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        movies: [{fake: true}],
      });
    });
});
