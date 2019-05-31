import React from 'react';
import PropTypes from 'prop-types';

const GenresList = (props) => {
  const {genres, active, setGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, idx)=> {
        return (
          <li key={`${genre}_${idx}`} onClick={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            return setGenre(genre);
          }} className={`catalog__genres-item ${genre === active ? `catalog__genres-item--active` : ``}`}>
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        );
      })
      }
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  active: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
};

export default GenresList;
