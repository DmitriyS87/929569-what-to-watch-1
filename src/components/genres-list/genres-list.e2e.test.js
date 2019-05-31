import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import GenresList from '../genres-list/genres-list';
import TEST_MOCKS from '../../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`GenresList run onCLick once for each child li: `, () => {
  const mockHandler = jest.fn();
  const evt = {
    stopPropagation() {
    },
    preventDefault() {
    }
  };
  const genresList = shallow(<GenresList
    genres={TEST_MOCKS.genres}
    active={TEST_MOCKS.activeGenre}
    setGenre={mockHandler}
  />);
  const genresItems = genresList.find(`.catalog__genres-item`);
  genresItems.forEach((genresItem) => genresItem.simulate(`click`, evt));

  expect(mockHandler).toHaveBeenCalledTimes(genresItems.length);
});

it(`GenresList return own genre for each child li when it clicked: `, () => {
  const mockHandler = jest.fn();
  const evt = {
    stopPropagation() {
    },
    preventDefault() {
    }
  };
  const genresList = shallow(<GenresList
    genres={TEST_MOCKS.genres}
    active={TEST_MOCKS.activeGenre}
    setGenre={mockHandler}
  />);
  const genresItems = genresList.find(`.catalog__genres-item`);
  genresItems.forEach((genresItem, idx) => {
    genresItem.simulate(`click`, evt);
    expect(mockHandler).toHaveBeenCalledWith(TEST_MOCKS.genres[idx]);
  });

});