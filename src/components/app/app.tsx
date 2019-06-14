import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from '../main/main-page';
import MyList from '../my-list/my-list';
import withPrivatePath from '../../hocs/with-private-path';
import { ActionCreator as GenreActionCreator } from '../../reducers/genre/genre';
import { ActionCreator as UserActionCreator } from '../../reducers/user/user';
import { Operation } from '../../reducers/user/user';
import { getAdaptedMovies } from '../../reducers/data/selectors';
import { getAuthorizationRequired } from '../../reducers/user/selectors';
import { getErrorMessage } from '../../reducers/user/selectors';
import { getUser } from '../../reducers/user/selectors';
import { Switch, Route } from 'react-router-dom';
import { getGenre } from '../../reducers/genre/selectors';
import SignIn from '../sign-in/sign-in';
import { Movies, RootState } from '../../types';

interface Props {
  movies: Movies[],
  setGenre: () => void,
  tryLogin: () => void,
  checkUser: () => void,
  active: string,
  isAuthorizationRequired: boolean,
  errorMessage: string,
  user: any
}

const PrivateMyList = withPrivatePath(MyList);
class App extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies, setGenre, active, isAuthorizationRequired, tryLogin, errorMessage, checkUser, user } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => <MainPage movies={movies} setGenre={setGenre} active={active} isAuthorizationRequired={isAuthorizationRequired} user={user} checkUser={checkUser} />} />
        <Route path="/login" render={() => <SignIn onLogin={tryLogin} message={errorMessage} user={user} />} />
        <Route path="/favorites" exact render={() => <PrivateMyList user={user} />} />
      </Switch>);
  }
}

const mapStateToProps = (state: RootState) => {
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
export { App };

