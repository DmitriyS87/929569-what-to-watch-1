import * as React from 'react';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import { Movie } from '../../types';

interface Props {
  movies: Movie[];
  setActive: (param: number | null) => void;
  activeItem: number | null;
}

class MoviesList extends React.PureComponent<Props> {
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

  render() {
    const { movies, activeItem } = this.props;

    if (!movies) {
      return <div />;
    }

    return (
      <div className='catalog__movies-list'>
        {movies.map((movie, idx) => {
          return (
            <SmallMovieCard
              key={`movie` + idx}
              active={movie.id === activeItem ? true : false}
              movie={movie}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
            />
          );
        })}
      </div>
    );
  }
}

export default MoviesList;
