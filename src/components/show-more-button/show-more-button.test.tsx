import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-button';
import mockData from '../../mocks/test-mocks.js';

it(`ShowMoreButton correctly renders after relunch with movies.length > length:`, () => {
  const tree = renderer.create(
    <ShowMoreButton
      movies={mockData.films}
      limit={2}
      setNewShowLimit={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`ShowMoreButton correctly renders after relunch with movies.length <= length:`, () => {
  const tree = renderer.create(
    <ShowMoreButton
      movies={mockData.films}
      limit={3}
      setNewShowLimit={jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
