import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MoviePageTab } from './movie-page-tab';
import mockData from '../../mocks/test-mocks.js';
import { Tab } from '../../types';

const mockReview = {
  id: 0,
  user: {
    id: 10,
    name: `Bob Marley`,
  },
  rating: 4.7,
  comment: `The best movie i have seen ever! All people should see it! Awsome! Bravo! Just see it now! It was a best lifetime!`,
  date: `2019-05-08T14:13:56.569Z`,
};

it(`MoviePageTab correctly renders Tab.OWERVIEW after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer
    .create(
      <MoviePageTab
        activeItem={Tab.OWERVIEW}
        setActive={clickHandler}
        movie={mockData.film}
        comments={[mockReview]}
        isLoading={false}
        loadMovieComments={clickHandler}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviePageTab correctly renders Tab.DETAILS after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer
    .create(
      <MoviePageTab
        activeItem={Tab.DETAILS}
        setActive={clickHandler}
        movie={mockData.film}
        comments={[mockReview]}
        isLoading={false}
        loadMovieComments={clickHandler}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MoviePageTab correctly renders Tab.REVIEWS after relunch: `, () => {
  const clickHandler = jest.fn();
  const tree = renderer
    .create(
      <MoviePageTab
        activeItem={Tab.REVIEWS}
        setActive={clickHandler}
        movie={mockData.film}
        comments={[mockReview]}
        isLoading={false}
        loadMovieComments={clickHandler}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
