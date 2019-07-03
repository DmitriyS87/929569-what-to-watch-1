import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { MoviePageTab } from './movie-page-tab';
import mockData from '../../mocks/test-mocks.js';
import { Tab } from '../../types';

configure({ adapter: new Adapter() });

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

it(`MoviePageTab clickHandler correctly returns Tab.DETAILS activeItem`, () => {
  const clickHandler = jest.fn();
  const evtMock = {
    preventDefault() {},
    target: {
      textContent: Tab.DETAILS,
    },
  };
  const component = shallow(
    <MoviePageTab
      activeItem={Tab.OWERVIEW}
      setActive={clickHandler}
      movie={mockData.film}
      comments={[mockReview]}
      isLoading={false}
      loadMovieComments={clickHandler}
    />
  );
  const activeItem = component.find(`.movie-nav__link`).at(0);
  activeItem.simulate(`click`, evtMock);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(Tab.DETAILS);
});
