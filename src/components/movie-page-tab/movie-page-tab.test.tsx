import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MoviePageTab from './movie-page-tab';
import mockData from '../../mocks/test-mocks.js';
import { TABS } from '../../constants/movie-page-tab.constant';
import { Tab } from '../../types';

it(`MoviePageTab correctly renders Tab.OWERVIEW after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer.create(
    <MoviePageTab
      navItems={TABS}
      activeItem={Tab.OWERVIEW}
      setActive={clickHandler}
      movie={mockData.film}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviePageTab correctly renders Tab.DETAILS after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer.create(
    <MoviePageTab
      navItems={TABS}
      activeItem={Tab.DETAILS}
      setActive={clickHandler}
      movie={mockData.film}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviePageTab correctly renders Tab.REVIEWS after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer.create(
    <MoviePageTab
      navItems={TABS}
      activeItem={Tab.REVIEWS}
      setActive={clickHandler}
      movie={mockData.film}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
