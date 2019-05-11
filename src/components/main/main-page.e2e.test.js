import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import MainPage from '../main/main-page.jsx';

Enzyme.configure({adapter: new Adapter()});


it(`movie card title click`, () => {
  const clickHandler = jest.fn();
  const mainPage = shallow(<MainPage
    movies={[
      `some movie name`
    ]}
    onClick={clickHandler}
  />);

  const titleButton = mainPage.find(`.small-movie-card__play-btn`);
  titleButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();

});
