import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import MoviesList from '../movies-list/movies-list';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

jest.useFakeTimers();

it(`MoviesList setState recieve correct movie.id: `, () => {
  const mockHandler = jest.fn();
  const initialState = {
    activeMovie: null
  };
  const moviesList = mount(<MoviesList
    movies={TEST_MOCKS.films}
    onClick={mockHandler}
  />);

  expect(moviesList.state()).toEqual(initialState);

  const movieCards = moviesList.find(`.small-movie-card`);
  movieCards.forEach((movieCard, idx) => {
    movieCard.simulate(`mouseenter`);
    jest.runAllTimers();
    expect(moviesList.state()).toEqual({
      activeMovie: TEST_MOCKS.films[idx].id
    });
  });
});
