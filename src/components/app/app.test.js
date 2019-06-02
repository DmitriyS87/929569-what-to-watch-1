import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

it(`App correctly renders after relunch`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
  .create(<App
    setGenre={mockFunction}
    {...TEST_MOCKS.dispatchToProps}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
