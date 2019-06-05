import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

const defaultGenre = `All genres`;
class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onFocus(movieId) {
    const {setActive} = this.props;
    setActive(movieId);
  }

  _onBlur() {
    const {setActive} = this.props;
    setActive(null);
  }

  _getFiltredFilms(genre, movies) {
    if (defaultGenre === genre) {
      return [...movies];
    }
    return [...movies.filter((film) => film.genre === genre)];
  }

  render() {
    const {activeGenre, movies, activeItem} = this.props;
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

MoviesList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string,
    id: PropTypes.number.isRequired
  })).isRequired,
  setActive: PropTypes.func.isRequired,
  activeItem: PropTypes.number,
};

export default MoviesList;
