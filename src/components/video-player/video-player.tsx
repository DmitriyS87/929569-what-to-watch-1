import * as React from 'react';
import { createRef } from 'react';

interface Props {
  poster: string,
  title: string,
  movies: { href: string, format: string }[],
  onMouseLeave: () => void,
}

class VideoPlayer extends React.Component<Props> {
  private video = createRef<any>();
  constructor(props) {
    super(props);
    this._onError = this._onError.bind(this);
  }

  render() {
    const { poster, movies, title } = this.props;
    return (
      <video ref={this.video} poster={poster} className="player__video">
        {movies.map((movie, idx) => {
          return <source key={`${title}${idx}`} src={movie.href} type={`video/${movie.format}`} />;
        })}
        К сожалению, ваш браузер не поддерживает HTML5 Video.
      </video>
    );
  }

  componentDidMount() {
    const { onMouseLeave } = this.props;
    const video: any = this.video.current;
    video.autoplay = true;
    video.controls = true;
    video.muted = true;
    video.onmouseleave = onMouseLeave;
    video.onerror = this._onError;
  }

  componentWillUnmount() {
    const video: any = this.video.current;
    video.autoplay = false;
    video.onerror = null;
    video.onmouseleave = null;
  }

  _onError() {
    const { onMouseLeave } = this.props;
    onMouseLeave();
    throw new Error(`Видео было перемещено или недоступно.`);
  }

}

export default VideoPlayer;
