import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from '../main/main-page.jsx';

it(`App correctly renders after relunch`, () => {
  const tree = renderer
  .create(<MainPage
    movies={[
      `some movie name`,
      `some movie name`,
      `some movie name`
    ]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
