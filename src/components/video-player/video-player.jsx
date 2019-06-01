import React from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends React.PureComponent {

  constructor(props) {
    super(props);
    this._video = React.createRef();
    this._onError = this._onError.bind(this);
  }

  render() {
    const {poster, movies, title} = this.props;

    return (
      <video ref={this._video} poster={poster} className="player__video" >
        {movies.map((movie, idx)=> {
          return <source key={`${title}${idx}`} src={movie.herf} type={`video/${movie.format}`} />;
        })}
        К сожалению, ваш браузер не поддерживает HTML5 Video.
      </video>
    );
  }

  componentDidMount() {
    const {onMouseLeave} = this.props;
    const video = this._video.current;
    video.autoplay = true;
    video.controls = true;
    video.muted = true;
    video.onMouseLeave = onMouseLeave;
    video.onError = this._onError;
  }

  componentWillUnmount() {
    const video = this._video.current;
    video.onMouseLeave();
    video.autoplay = false;
    video.onError = null;
    video.onMouseLeave = null;
  }

  _onError() {
    const {onMouseLeave} = this.props;
    onMouseLeave();
    throw new Error(`Видео было перемещено или недоступно.`);
  }

}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired),
  onMouseLeave: PropTypes.func,
};

export default VideoPlayer;
