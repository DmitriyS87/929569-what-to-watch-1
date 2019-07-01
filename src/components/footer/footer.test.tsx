import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Footer from './footer';

it(`Footer correctly renders after relunch`, () => {
  const tree = renderer.create(<Footer />).toJSON();

  expect(tree).toMatchSnapshot();
});
