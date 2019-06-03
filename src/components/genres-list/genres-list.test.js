import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from '../genres-list/genres-list';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`GenresList correctly renders after relunch`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(<GenresList
      genres={TEST_MOCKS.genres}
      activeItem={TEST_MOCKS.activeGenre}
      setGenre={mockHandle}
      setActive={mockHandle}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
