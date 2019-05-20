import React from 'react';
import PropTypes from 'prop-types';


class SmallMovieCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this._onPlay = this._onPlay.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onPlay() {
    this.props.onPlayClick(this);
  }

  _onFocus() {
    this.props.onFocus(this.props.movie.id);
  }

  _onBlur() {
    this.props.onBlur();
  }

  render() {
    const {movie} = this.props;

    return (
      <article key={`movie` + movie.id} className="small-movie-card catalog__movies-card" onFocus={this._onFocus} onBlur={this._onBlur} onMouseEnter={this._onFocus} onMouseLeave={this._onBlur} >
        <button className="small-movie-card__play-btn" type="button" onClick={this._onPlay}>Play</button>
        <div className="small-movie-card__image">
          <img src={movie.coverSrc} alt={movie.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  onPlayClick: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SmallMovieCard;
