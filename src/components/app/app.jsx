import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main/main-page.jsx';
import {ActionCreator} from '../../reducers/reducer';

const transformToAppData = (data) => {
  return data.map((movie) => {
    return {
      title: movie.name,
      coverSrc: movie[`preview_image`],
      id: movie.id,
      links: [{
        href: movie[`preview_video_link`],
        format: `mp4`
      }],
      genre: movie.genre,
    };
  });
};
class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, setGenre, active} = this.props;

    return (
      <MainPage movies={movies} setGenre={setGenre} active={active} />
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGenre: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    active: state.genre,
    movies: transformToAppData(state.movies),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setGenre: (genre) => dispatch(ActionCreator.changeGenre(genre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};

