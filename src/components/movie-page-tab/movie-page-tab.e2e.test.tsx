import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import MoviePageTab from './movie-page-tab';
import mockData from '../../mocks/test-mocks.js';
import { TABS } from '../../constants/movie-page-tab.constant';
import { Tab } from '../../types';


configure({ adapter: new Adapter });

it(`MoviePageTab clickHandler correctly returns Tab.DETAILS activeItem`, () => {
  const clickHandler = jest.fn();
  const evtMock = {
    preventDefault() { },
    target: {
      textContent: Tab.DETAILS
    }
  }
  const component = shallow(
    <MoviePageTab
      navItems={TABS}
      activeItem={Tab.OWERVIEW}
      setActive={clickHandler}
      movie={mockData.film}
    />
  );
  const activeItem = component.find(`.movie-nav__link`).at(0);
  activeItem.simulate(`click`, evtMock);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(Tab.DETAILS);
});
