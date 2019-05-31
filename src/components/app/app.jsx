import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main/main-page.jsx';
import {changeGenre} from '../../reducers/reducer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, setGenre, active, genres} = this.props;
    const clickHandler = () => {
    };
    return (
      <MainPage movies={movies} onClick={clickHandler} setGenre={setGenre} active={active} genres={genres} />
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGenre: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => {
  return {
    active: state.genre,
    movies: state.movies,
    genres: state.genres,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setGenre: (genre) => dispatch(changeGenre(genre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};

