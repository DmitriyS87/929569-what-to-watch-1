import {GENRE_LIST_ACTION} from '../constants/genre-list-action.constant';
import films from '../mocks/films';
import {getUniqueStrings} from '../utils/get-unique-strings';

const defaultGenre = `All genres`;

const initialState = {
  genre: `All genres`,
  movies: films,
  genres: [`All genres`, ...getUniqueStrings(films.map((it) => it.genre))]
};

const changeGenre = (genre) => {
  return {
    type: GENRE_LIST_ACTION.GENRE_CHANGE,
    genre,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GENRE_LIST_ACTION.GENRE_CHANGE:
      return Object.assign({}, state, {genre: action.genre, movies: getFiltredFilms(action.genre, [...initialState.movies])});
    default:
      return state;
  }
};


const getFiltredFilms = (genre, movies) => {
  if (defaultGenre === genre) {
    return [...movies];
  }
  return [...movies.filter((film) => film.genre === genre)];
};

export {reducer, changeGenre};
