import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

it(`App correctly renders after relunch`, () => {
  const tree = renderer
  .create(<App
    movies={[
      `some movie name`,
      `some movie name`,
      `some movie name`
    ]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
