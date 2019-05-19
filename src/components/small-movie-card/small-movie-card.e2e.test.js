import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockMovie = {
  title: `Aviator`,
  coverSrc: `img/aviator.jpg`,
  id: 0
};

it(`SmallMovieCard correctly calles callbacks onMouseEnter, onClick, onMouseLeave`, () => {
  const mockFunctionFocus = jest.fn();
  const mockHandler = jest.fn();
  const mainPage = shallow(<SmallMovieCard
    movie={mockMovie}
    onPlayClick={mockHandler}
    onFocus={mockFunctionFocus}
    onBlur={mockHandler}
  />);

  const movieCard = mainPage.find(`.small-movie-card`);
  movieCard.simulate(`mouseenter`);
  expect(mockFunctionFocus).toHaveBeenCalledWith(mockMovie.id);

  const playButton = movieCard.find(`.small-movie-card__play-btn`);
  playButton.simulate(`click`);
  expect(mockHandler).toHaveBeenCalledTimes(1);

  playButton.simulate(`mouseleave`);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
