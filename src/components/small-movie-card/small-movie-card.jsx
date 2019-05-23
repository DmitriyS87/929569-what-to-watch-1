import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-payer.jsx';

class SmallMovieCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      shouldPlay: false,
    };

    // this._onPlay = this._onPlay.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  // _onPlay() {
  //   this.props.onPlayClick(this);
  // }
  _startTimer() {
    const self = this;
    const startPlay = (movieCard) => {
      movieCard.setState({shouldPlay: true});
    };
    setTimeout(startPlay, 1000, self);
  }

  _onFocus() {
    // this.props.onFocus(this.props.movie.id);
    this.setState({isFocused: true});
    this._startTimer();
  }

  _onBlur() {
    // this.props.onBlur();
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
        {/* <button className="small-movie-card__play-btn" type="button" onClick={this._onPlay}>Play</button> */}
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
  onPlayClick: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SmallMovieCard;
