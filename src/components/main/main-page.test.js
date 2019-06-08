import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from '../main/main-page.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`MainPage correctly renders without user`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(<MainPage
      movies={TEST_MOCKS.films}
      setGenre={mockHandle}
      checkUser={mockHandle}
      active={TEST_MOCKS.activeGenre}
      user={null}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with user login`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(<MainPage
      movies={TEST_MOCKS.films}
      setGenre={mockHandle}
      checkUser={mockHandle}
      active={TEST_MOCKS.activeGenre}
      user={{id: 1}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
