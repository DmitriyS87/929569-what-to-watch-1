import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MoviesListLikeThis from './movies-list-like-this';

it(`MoviesListLikeThis correctly renders after relunch`, () => {
  const tree = renderer.create(
    <MoviesListLikeThis
      children={<div>Mock Children</div>}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

