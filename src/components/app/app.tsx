import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from '../main/main-page';
import MyList from '../my-list/my-list';
import withPrivatePath from '../../hocs/with-private-path';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import { ActionCreator as GenreActionCreator } from '../../reducers/genre/genre';
import { ActionCreator as UserActionCreator, Operation } from '../../reducers/user/user';
import { ActionCreator as DataActionCreator } from '../../reducers/data/data.js';
import { getAdaptedMovies, getMoviesShowLimit } from '../../reducers/data/selectors';
import { getAuthorizationRequired, getErrorMessage, getUser } from '../../reducers/user/selectors';
import { getGenre } from '../../reducers/genre/selectors';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import { Movie, RootState } from '../../types';

interface Props {
  movies: Movie[],
  setGenre: () => void,
  tryLogin: () => void,
  checkUser: () => void,
  setNewShowLimit: () => void,
  active: string,
  isAuthorizationRequired: boolean,
  errorMessage: string,
  user: any,
  moviesShowLimit: number
}

const PrivateMyList = withPrivatePath(MyList);
class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies, setGenre, active, tryLogin, errorMessage, user, moviesShowLimit, setNewShowLimit } = this.props;

    return (
      <Switch>
        <Route path="/" exact render={() => <MainPage movies={movies} moviesLimit={moviesShowLimit} setShowLimit={setNewShowLimit} setGenre={setGenre} active={active} user={user} />} />
        <Route path="/login" render={() => <SignIn onLogin={tryLogin} message={errorMessage} />} />
        <Route path="/favorites" exact render={() => <PrivateMyList user={user} />} />
        <Route path="/film/:id" exact render={(route) => <MoviePageDetails movies={movies} id={route.match.params.id} />} />
      </Switch>);
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    active: getGenre(state),
    movies: getAdaptedMovies(state),
    moviesShowLimit: getMoviesShowLimit(state),
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
    setNewShowLimit: (limit) => dispatch(DataActionCreator.setMoviesShowLimit(limit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export { App };

