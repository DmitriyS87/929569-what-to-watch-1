import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {

  constructor(props) {
    super(props);

    this._onError = this._onError.bind(this);
  }

  _onError() {
    const {onMouseLeave} = this.props;
    onMouseLeave();
    throw new Error(`Видео было перемещено или недоступно.`);
  }

  // loadstart, progress, suspend, abort, error, emptied, stalled), так и с буферизацией (loadedmetadata, loadeddata, waiting, playing, canplay, canplaythrough)
  render() {
    const {poster, movies, title, onMouseLeave} = this.props;

    return (
      <video autoPlay controls poster={poster} muted className="player__video" onMouseLeave={onMouseLeave} onError={onMouseLeave}>
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
  onMouseLeave: PropTypes.func,
};

export default VideoPlayer;
