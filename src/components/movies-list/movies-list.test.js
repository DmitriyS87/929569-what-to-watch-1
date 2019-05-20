import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from '../movies-list/movies-list.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`MoviesList correctly renders after relunch`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
  .create(<MoviesList
    movies={TEST_MOCKS.films}
    onClick={mockHandle}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
