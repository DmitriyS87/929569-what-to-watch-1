import * as React from 'react';
import FullScreenMovie from '../components/full-screen-movie/full-screen-movie';

export interface withFullScreenVideo {
  isPalyerOpen: boolean;
}

const withFullScreenPlayer = (Child: React.ReactNode) => {
  class WithFullScreenPlayer extends React.Component<any, withFullScreenVideo> {
    constructor(props) {
      super(props);

      this.state = {
        isPalyerOpen: false,
      };

      this.handlerPlayerOpen = this.handlerPlayerOpen.bind(this);
      this.handlerPlayerClose = this.handlerPlayerClose.bind(this);
    }

    shouldComponentUpdate(_nextProps, nestState) {
      if (this.state.isPalyerOpen === nestState.isPalyerOpen) {
        return true;
      }
      return false;
    }

    handlerPlayerOpen() {
      this.setState({ isPalyerOpen: true });
    }

    handlerPlayerClose() {
      this.setState({ isPalyerOpen: false });
    }

    render() {
      const { isPalyerOpen } = this.state;
      const { currentMovie } = this.props;
      if (isPalyerOpen) {
        return <FullScreenMovie movie={currentMovie} onClose={this.handlerPlayerClose} />;
      }
      // @ts-ignore
      return <Child {...this.props} onPlayStart={this.handlerPlayerOpen} />;
    }
  }

  return WithFullScreenPlayer;
};

export default withFullScreenPlayer;
