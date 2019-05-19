import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`SmallMovieCard correctly renders after relunch`, () => {
  const mockHandler = jest.fn();
  const tree = renderer
  .create(<SmallMovieCard
    movie={TEST_MOCKS.film}
    onPlayClick={mockHandler}
    onFocus={mockHandler}
    onBlur={mockHandler}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
