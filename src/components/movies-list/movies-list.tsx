import * as React from 'react';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import { Movies } from '../../types';

const defaultGenre = `All genres`;

interface Props {
  activeGenre: string,
  movies: Movies[],
  setActive: (param: number | null) => void,
  activeItem: number,
}

class MoviesList extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onFocus(movieId) {
    const { setActive } = this.props;
    setActive(movieId);
  }

  _onBlur() {
    const { setActive } = this.props;
    setActive(null);
  }

  _getFiltredFilms(genre, movies) {
    if (defaultGenre === genre) {
      return [...movies];
    }
    return [...movies.filter((film) => film.genre === genre)];
  }

  render() {
    const { activeGenre, movies, activeItem } = this.props;
    const filtredMovies = this._getFiltredFilms(activeGenre, movies);
    return (
      <div className="catalog__movies-list">
        {filtredMovies.map((movie, idx) => {
          return (<SmallMovieCard key={`movie` + idx} active={movie.id === activeItem ? true : false} movie={movie} onFocus={this._onFocus} onBlur={this._onBlur} />);
        })}
      </div>
    );
  }
}

export default MoviesList;
