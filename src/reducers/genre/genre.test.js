import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import {reducer, ActionCreator} from './genre';

import TEST_MOCKS from '../../mocks/test-mocks.js';

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
