import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../components/small-movie-card/small-movie-card.jsx';

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMovie: null
    };

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onFocus(element) {
    this.setState({
      activeMovie: element
    });
  }

  _onBlur() {
    this.setState({
      activeMovie: null
    });
  }

  render() {

    const {movies, onClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, idx) => {
          return (<SmallMovieCard key={`movie` + idx} movie={movie} onPlayClick={onClick} onFocus={this._onFocus} onBlur={this._onBlur} />);
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func
};

export default MoviesList;
