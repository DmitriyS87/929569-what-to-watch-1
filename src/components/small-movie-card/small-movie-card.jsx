import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

class SmallMovieCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      shouldPlay: false,
    };

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _startTimer(evt) {
    const self = this;
    const onPlay = this.props.onPlay;
    const startPlay = (movieCard, callback) => {
      callback(evt, movieCard);
      movieCard.setState({shouldPlay: true});
    };
    setTimeout(startPlay, 1000, self, onPlay);
  }

  _onFocus(evt) {
    this.props.onFocus(this.props.movie.id);
    this.setState({isFocused: true});
    this._startTimer(evt);
  }

  _onBlur() {
    this.props.onBlur();
    this.setState({isFocused: false, shouldPlay: false});
  }

  render() {
    const {movie} = this.props;
    const {isFocused, shouldPlay} = this.state;

    const screen = () => {

      if (isFocused && shouldPlay) {
        return <VideoPlayer poster={movie.coverSrc} movies={movie.links} title={movie.title} onMouseLeave={this._onBlur} />;
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
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverSrc: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  onPlay: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SmallMovieCard;
