import React from 'react';
import PropTypes from 'prop-types';
import {getUniqueStrings} from '../../utils/get-unique-strings';

const GenresList = (props) => {
  const {movies, activeItem, setGenre, setActive} = props;
  const genres = [`All genres`, ...getUniqueStrings(movies.map((it) => it.genre))];
  const handleClick = (evt, genre) => {
    evt.stopPropagation();
    evt.preventDefault();
    setActive(genre);
    setGenre(genre);
  };
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, idx) => {
        return (
          <li key={`${genre}_${idx}`} onClick={(evt) => handleClick(evt, genre)} className={`catalog__genres-item ${genre === activeItem ? `catalog__genres-item--active` : ``}`}>
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        );
      })
      }
    </ul>
  );
};

GenresList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  activeItem: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default GenresList;
