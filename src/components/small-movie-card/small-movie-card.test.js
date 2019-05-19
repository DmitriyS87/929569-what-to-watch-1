import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const mockMovie = {
  title: `Aviator`,
  coverSrc: `img/aviator.jpg`,
  id: 0
};

it(`SmallMovieCard correctly renders after relunch`, () => {
  const mockHandler = jest.fn();
  const tree = renderer
  .create(<SmallMovieCard
    movie={mockMovie}
    onPlayClick={mockHandler}
    onFocus={mockHandler}
    onBlur={mockHandler}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
