import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from '../main/main-page.jsx';
import {ActionCreator as GenreActionCreator} from '../../reducers/genre/genre';
import {ActionCreator as UserActionCreator} from '../../reducers/user/user';
import {Operation} from '../../reducers/user/user';
import {getAdaptedMovies} from '../../reducers/data/selectors';
import {getAuthorizationRequired} from '../../reducers/user/selectors';
import {getErrorMessage} from '../../reducers/user/selectors';
import {getUser} from '../../reducers/user/selectors';

import {getGenre} from '../../reducers/genre/selectors';
import SignIn from '../sign-in/sign-in.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, setGenre, active, isAuthorizationRequired, tryLogin, errorMessage, checkUser, user} = this.props;
    if (isAuthorizationRequired) {
      return <SignIn onLogin={tryLogin} message={errorMessage} />;
    }

    return (
      <MainPage movies={movies} setGenre={setGenre} active={active} isAuthorizationRequired={isAuthorizationRequired} user={user} checkUser={checkUser} />
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGenre: PropTypes.func.isRequired,
  tryLogin: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    active: getGenre(state),
    movies: getAdaptedMovies(state),
    isAuthorizationRequired: getAuthorizationRequired(state),
    errorMessage: getErrorMessage(state),
    user: getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGenre: (genre) => dispatch(GenreActionCreator.changeGenre(genre)),
    tryLogin: (userData) => dispatch(Operation.tryLogin(userData)),
    checkUser: () => dispatch(UserActionCreator.checkUser(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};

