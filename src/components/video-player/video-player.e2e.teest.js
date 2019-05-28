import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import VideoPlayer from '../video-player/video-player.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`VideoPlayer correctly calles callbacks onMouseEnter, onClick, onMouseLeave`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const mainPage = shallow(<VideoPlayer
    movie={TEST_MOCKS.film}
    onPlayClick={mockHandler}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  const movieCard = mainPage.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  expect(mockFunctionFocus).toHaveBeenCalledWith(TEST_MOCKS.film.id);

  const playButton = movieCard.find(`.small-movie-card__play-btn`);
  playButton.simulate(`click`);
  expect(mockHandler).toHaveBeenCalledTimes(1);

  playButton.simulate(`mouseleave`);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
