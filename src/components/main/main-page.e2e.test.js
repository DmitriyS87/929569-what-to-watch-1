import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import MainPage from '../main/main-page.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`movie card title click`, () => {
  const clickHandler = jest.fn();
  const mainPage = mount(<MainPage
    movies={TEST_MOCKS.films}
    onClick={clickHandler}
  />);

  const titleButton = mainPage.find(`.small-movie-card__play-btn`);
  titleButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
