import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main/main-page.jsx';
import {ActionCreator} from '../../reducers/genre/genre';
import {getAdaptedMovies} from '../../reducers/data/selectors';
import {getGenre} from '../../reducers/genre/selectors';
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
    active: getGenre(state),
    movies: getAdaptedMovies(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setGenre: (genre) => dispatch(ActionCreator.changeGenre(genre)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};

