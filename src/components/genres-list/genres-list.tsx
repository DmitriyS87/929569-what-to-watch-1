import * as React from 'react';
import { getUniqueStrings } from '../../utils/get-unique-strings';
import { getLimitedItems } from '../../utils/get-limited-items';
import { Movie } from '../../types';

interface Props {
  movies: Movie[];
  activeItem: string;
  setGenre: (genre: string) => void;
  setActive: (genre: string) => void;
}

class GenresList extends React.Component<Props> {
  render() {
    const { movies, activeItem, setGenre, setActive } = this.props;
    const genres = getLimitedItems(9, [
      `All genres`,
      ...getUniqueStrings(movies.map(it => it.genre)),
    ]);
    const handleClick = (evt, genre) => {
      evt.stopPropagation();
      evt.preventDefault();
      setActive(genre);
      setGenre(genre);
    };
    return (
      <ul className='catalog__genres-list'>
        {genres.map((genre, idx) => {
          return (
            <li
              key={`${genre}_${idx}`}
              onClick={evt => handleClick(evt, genre)}
              className={`catalog__genres-item ${
                genre === activeItem ? `catalog__genres-item--active` : ``
              }`}
            >
              <a href='#' className='catalog__genres-link'>
                {genre}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default GenresList;
