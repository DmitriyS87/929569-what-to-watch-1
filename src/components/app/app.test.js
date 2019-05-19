import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`App correctly renders after relunch`, () => {
  const tree = renderer
  .create(<App
    movies={TEST_MOCKS.films}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
