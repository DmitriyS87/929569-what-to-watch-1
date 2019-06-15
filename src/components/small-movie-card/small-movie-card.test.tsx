import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { SmallMovieCard } from './small-movie-card';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`SmallMovieCard correctly renders after relunch`, () => {
  const mockHandler = jest.fn();
  const MOCK_ACTIVE = false;
  const tree = renderer
    .create(<SmallMovieCard
      movie={TEST_MOCKS.film}
      active={MOCK_ACTIVE}
      onFocus={mockHandler}
      onBlur={mockHandler}
      history={{ push: jest.fn() }}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
