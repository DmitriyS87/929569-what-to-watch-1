import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`SmallMovieCard has a correct initial state: `, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  expect(smallMovieCard.state([`isFocused`])).toEqual(false);
  expect(smallMovieCard.state([`shouldPlay`])).toEqual(false);
});

it(`SmallMovieCard return for calback movie.id on mouseenter`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  const movieCard = smallMovieCard.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  expect(mockFunctionFocus).toHaveBeenCalledWith(TEST_MOCKS.film.id);
});

it(`SmallMovieCard correctly calles callback onMouseLeave`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  const movieCard = smallMovieCard.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  movieCard.simulate(`mouseleave`);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});

it(`SmallMovieCard has a correct state onMouseLeave`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const smallMovieCard = shallow(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  const movieCard = smallMovieCard.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  expect(smallMovieCard.state([`isFocused`])).toEqual(true);
  expect(smallMovieCard.state([`shouldPlay`])).toEqual(false);

  movieCard.simulate(`mouseleave`);
  expect(smallMovieCard.state([`isFocused`])).toEqual(false);
});
