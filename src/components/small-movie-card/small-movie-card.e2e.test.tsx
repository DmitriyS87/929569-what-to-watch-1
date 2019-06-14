import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import SmallMovieCard from './small-movie-card';
import TEST_MOCKS from '../../mocks/test-mocks.js';

configure({ adapter: new Adapter() });

const MOCK_ACTIVE = false;

jest.useFakeTimers();

it(`SmallMovieCard return for calback movie.id on mouseenter`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
    active={MOCK_ACTIVE}
  />);
  expect(mockFunctionFocus).not.toBeCalled();
  const movieCard = smallMovieCard.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  jest.runAllTimers();
  expect(mockFunctionFocus).toBeCalled();
  expect(mockFunctionFocus).toHaveBeenCalledWith(TEST_MOCKS.film.id);
});

it(`SmallMovieCard correctly calles callback onMouseLeave`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
    active={MOCK_ACTIVE}
  />);

  const movieCard = smallMovieCard.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  movieCard.simulate(`mouseleave`);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
