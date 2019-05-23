import React from 'react';
import PropTypes from 'prop-types';
// import VIDEO_PLAYER_CONSTANT from '../../constants/video-player-constant.js';

class VideoPlayer extends React.PureComponent {

  constructor(props) {
    super(props);

    // this._onPlay = this._onPlay.bind(this);
    // this._onFocus = this._onFocus.bind(this);
    // this._onBlur = this._onBlur.bind(this);
    // this._cutFormat = this._cutFormat.bind(this);
  }

  // _cutFormat(src) {
  //   return src.match(VIDEO_PLAYER_CONSTANT.formatPatten);
  // }

  // _onPlay() {
  //   this.props.onPlayClick(this);
  // }

  // _onFocus() {
  //   this.props.onFocus(this.props.movie.id);
  // }

  // _onBlur() {
  //   this.props.onBlur();
  // }

  // loadstart, progress, suspend, abort, error, emptied, stalled), так и с буферизацией (loadedmetadata, loadeddata, waiting, playing, canplay, canplaythrough)
  render() {
    const {poster, movies, title} = this.props;

    return (
      <video autoPlay controls poster={poster} muted>
        {movies.map((movie, idx)=> {
          return <source key={`${title}${idx}`} src={movie.herf} type={`video/${movie.format}`} />;
        })}
        К сожалению, ваш браузер не поддерживает HTML5 Video.
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired),
  // onPlayClick: PropTypes.func,
  // onFocus: PropTypes.func.isRequired,
  // onBlur: PropTypes.func.isRequired,
};

export default VideoPlayer;
