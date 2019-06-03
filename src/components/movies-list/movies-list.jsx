import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMovie: null
    };

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

  render() {
    const {movies, onClick, activeItem} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie, idx) => {
          return (<SmallMovieCard key={`movie` + idx} active={movie.id === activeItem ? true : false} movie={movie} onPlay={onClick} onFocus={this._onFocus} onBlur={this._onBlur} />);
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string,
    id: PropTypes.number.isRequired
  })).isRequired,
  onClick: PropTypes.func,
  setActive: PropTypes.func.isRequired,
  activeItem: PropTypes.number,
};

export default MoviesList;
