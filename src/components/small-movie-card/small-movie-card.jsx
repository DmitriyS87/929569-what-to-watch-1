import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

class SmallMovieCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._clearTimeOut = this._clearTimeOut.bind(this);
  }

  _startTimer() {
    const self = this;
    const onPlay = this.props.onFocus;
    const startPlay = (movieCard, callback) => {
      callback(movieCard.props.movie.id);
    };
    this.timeOutId = setTimeout(startPlay, 1000, self, onPlay);
  }

  _onFocus() {
    this._startTimer();
  }

  _onBlur() {
    this.props.onBlur();
    this._clearTimeOut();
  }

  _clearTimeOut() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
  }

  render() {
    const {movie, active} = this.props;

    const screen = () => {

      if (active) {
        return <VideoPlayer poster={movie.coverSrc} movies={movie.links} title={movie.title} />;
      }

      return (<React.Fragment>
        <div className="small-movie-card__image">
          <img src={movie.coverSrc} alt={movie.title} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </React.Fragment>);
    };

    return (
      <article key={`movie` + movie.id} className="small-movie-card catalog__movies-card" onMouseEnter={this._onFocus} onMouseLeave={this._onBlur} >
        {screen()}
      </article>
    );
  }

  componentWillUnmount() {
    this._clearTimeOut();
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  active: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SmallMovieCard;
