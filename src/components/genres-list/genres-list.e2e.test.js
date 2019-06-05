import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import GenresList from '../genres-list/genres-list';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

const mockHandlerSetGenre = jest.fn();
const mockHandlerSetActive = jest.fn();

it(`GenresList run onCLick once for each child li: `, () => {
  const evt = {
    stopPropagation() {
    },
    preventDefault() {
    }
  };

  const genresList = shallow(<GenresList
    movies={TEST_MOCKS.films}
    activeItem={TEST_MOCKS.activeGenre}
    setGenre={mockHandlerSetGenre}
    setActive={mockHandlerSetActive}
  />);
  const genresItems = genresList.find(`.catalog__genres-item`);
  genresItems.forEach((genresItem) => genresItem.simulate(`click`, evt));

  expect(mockHandlerSetGenre).toHaveBeenCalledTimes(genresItems.length);
});

it(`GenresList return own genre for each child li when it clicked: `, () => {

  const evt = {
    stopPropagation() {
    },
    preventDefault() {
    }
  };

  const genresList = shallow(<GenresList
    movies={TEST_MOCKS.films}
    activeItem={TEST_MOCKS.activeGenre}
    setGenre={mockHandlerSetGenre}
    setActive={mockHandlerSetActive}
  />);

  const genresItems = genresList.find(`.catalog__genres-item`);

  genresItems.forEach((genresItem, idx) => {
    genresItem.simulate(`click`, evt);
    expect(mockHandlerSetGenre).toHaveBeenCalledWith(TEST_MOCKS.genres[idx]);
  });

});
