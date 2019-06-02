import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

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
