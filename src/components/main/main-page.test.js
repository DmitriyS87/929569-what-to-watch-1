import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from '../main/main-page.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`MainPage correctly renders after relunch`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
  .create(<MainPage
    movies={TEST_MOCKS.films}
    onClick={mockHandle}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
