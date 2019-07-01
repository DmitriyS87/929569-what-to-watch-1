import * as React from 'react';
import { createRef } from 'react';
import { compose } from 'recompose';
import { Movie } from '../../types';
import { withSVG } from '../../hocs/with-svg';

interface Props {
  movie: Movie;
  onClose: () => void;
}

interface State {
  play: boolean;
  progress: number;
  toggler: number;
  isTogglerOn: boolean;
  dragElementStyle: object;
  isTogglerDragged: boolean;
  dragX: number;
  dragY: number;
  xStart: number;
  yStart: number;
  scalePixels: number;
  scale: any;
}

class FullScreenMovie extends React.PureComponent<Props, State> {
  private video = createRef<any>();
  private timeSlider = createRef<any>();
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      progress: 0,
      toggler: 0,
      isTogglerOn: false,
      isTogglerDragged: false,
      dragElementStyle: {},
      xStart: 0,
      yStart: 0,
      dragX: 0,
      dragY: 0,
      scale: 0,
      scalePixels: 0,
    };

    this.handleExitClick = this.handleExitClick.bind(this);
    this.handlerTogglePlay = this.handlerTogglePlay.bind(this);
    this.handlerFullScreenClick = this.handlerFullScreenClick.bind(this);
    this.handlerTogglerMouseDown = this.handlerTogglerMouseDown.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleNextScalePoint = this.handleNextScalePoint.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handlerTimePropgessClick = this.handlerTimePropgessClick.bind(this);
  }

  componentDidMount() {
    const video: any = this.video.current;
    const timeSlider: any = this.timeSlider.current;
    video.autoplay = true;
    video.oncanplay = () => {
      const scalePersentage = video.duration / 100;
      this.props.movie.runTime = this.getStringFormattedTime(video.duration);
      this.setState({
        scale: scalePersentage,
        scalePixels: video.duration / timeSlider.offsetWidth,
      });
    };
    video.onended = () => {
      this.setState({ play: false });
    };
    video.onerror = () => {
      this.setState({ play: false });
    };
    video.ontimeupdate = () => {
      this.handleNextScalePoint();
    };
  }

  handleNextScalePoint() {
    this.state.play &&
      this.setState({
        toggler: this.video.current.currentTime / Number(this.state.scale),
        progress:
          this.video.current.buffered.end(this.video.current.buffered.length - 1) /
          Number(this.state.scale),
      });
  }

  handlerTogglePlay(evt) {
    evt.preventDefault();
    this.state.play ? this.video.current.pause() : this.video.current.play();
    this.setState({ play: !this.state.play });
  }

  handlerFullScreenClick(evt) {
    evt.preventDefault();
  }

  handlerTimePropgessClick(evt) {
    evt.preventDefault();
    const rect = evt.currentTarget.getBoundingClientRect();
    const newToggler = ((evt.pageX - rect.left) * this.state.scalePixels) / this.state.scale;
    this.setState({ toggler: newToggler }, () => {
      this.video.current.currentTime = this.state.toggler * this.state.scale;
      const autoStart = self => {
        self.setState({ play: true });
      };
      setTimeout(autoStart, 200, this);
    });
  }

  handlerTogglerMouseDown(evt) {
    this.setState({ xStart: evt.pageX, yStart: evt.pageY });
  }

  handleDragStart(evt) {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/html', evt.target);
    this.setState({
      isTogglerDragged: true,
      dragElementStyle: { ...this.state.dragElementStyle, opacity: 0.4, cursor: 'none' },
    });
  }

  handleDragOver(evt) {
    evt.pageY = this.state.yStart;
    this.setState({ dragX: evt.pageX });
  }

  handleDrop(evt) {
    evt.preventDefault();
    console.log(`drop`);
    const range =
      ((this.state.dragX - this.state.xStart) * this.state.scalePixels) / this.state.scale;
    // const newLeft = (range >= 0 && range <= 100) ? range : 0;
    const start = this.state.toggler;
    let newToggler = start + range;
    if (newToggler > 100) {
      newToggler = 100;
    }
    if (newToggler < 1) {
      newToggler = 0;
    }
    this.setState({ toggler: newToggler, isTogglerDragged: false }, () => {
      this.video.current.currentTime = this.state.toggler * this.state.scale;
    });
  }

  handleDragExit(evt) {
    evt.preventDefault();
  }

  handleDragLeave(evt) {
    evt.preventDefault();
  }

  countToggleX(evtX) {
    return evtX;
  }

  getStringFormattedTime(duration) {
    const hours = ~~(duration / 3600);
    const minutes = ~~(duration / 60);
    const seconds = ~~(duration % 60);
    return `${hours}:${minutes}:${seconds}`;
  }

  handleExitClick() {
    const { onClose } = this.props;
    this.setState({ play: false }, onClose);
  }

  render() {
    const { poster, fullMovie, runTime, title } = this.props.movie;
    const { progress, dragElementStyle, toggler, scale } = this.state;

    return (
      <React.Fragment>
        <div className='player'>
          <video ref={this.video} poster={poster.src} className='player__video'>
            <source src={fullMovie.href} type={`video/${fullMovie.format}`} />; К сожалению, ваш
            браузер не поддерживает ${fullMovie.format} Video.
          </video>
          <button type='button' className='player__exit' onClick={this.handleExitClick}>
            Exit
          </button>

          <div className='player__controls'>
            <div className='player__controls-row'>
              <div
                className='player__time'
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                onClick={this.handlerTimePropgessClick}
              >
                <progress
                  ref={this.timeSlider}
                  className='player__progress'
                  value={progress}
                  max='100'
                />
                <div
                  className='player__toggler'
                  style={{ left: toggler + '%', dragElementStyle }}
                  onMouseDown={this.handlerTogglerMouseDown}
                  draggable={true}
                  onDragStart={this.handleDragStart}
                  onDragExit={this.handleDragExit}
                  onDragLeave={this.handleDragLeave}
                >
                  Toggler
                </div>
              </div>
              <div className='player__time-value'>{`${this.getStringFormattedTime(
                toggler * scale
              )} | ${runTime}`}</div>
            </div>

            <div className='player__controls-row'>
              <button type='button' className='player__play' onClick={this.handlerTogglePlay}>
                <svg viewBox='0 0 19 19' width='19' height='19'>
                  <use xlinkHref={this.state.play ? '#pause' : '#play-s'} />
                </svg>
                <span>{this.state.play ? `Pause` : `Play`}</span>
              </button>
              <div className='player__name'>{title}</div>

              <button
                type='button'
                className='player__full-screen'
                onClick={this.handlerFullScreenClick}
              >
                <svg viewBox='0 0 27 27' width='27' height='27'>
                  <use xlinkHref='#full-screen' />
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(withSVG)(FullScreenMovie);
export { FullScreenMovie };
