import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from '../main/main-page';
import MyList from '../my-list/my-list';
import withPrivatePath from '../../hocs/with-private-path';
import withFullScreenPlayer from '../../hocs/with-fullscreen-player';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import { ActionCreator as GenreActionCreator } from '../../reducers/genre/genre';
import {
  ActionCreator as UserActionCreator,
  Operation as OperationUser,
} from '../../reducers/user/user';
import {
  ActionCreator as DataActionCreator,
  Operation as OperationData,
} from '../../reducers/data/data.js';
import {
  getAdaptedMovies,
  getMoviesShowLimit,
  getAdaptedPromoMovie,
} from '../../reducers/data/selectors';
import { getAuthorizationRequired, getErrorMessage, getUser } from '../../reducers/user/selectors';
import { getGenre } from '../../reducers/genre/selectors';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import { Movie, RootState } from '../../types';
import { getMovie } from '../../utils/get-movie-from-id';
import ReviewAdd from '../review-add/review-add';
import { getAdaptedRouteId } from '../../utils/get-adapted-route-id';

interface Props {
  movies: Movie[];
  promoMovie: Movie;
  setGenre: () => void;
  tryLogin: () => void;
  setNewShowLimit: () => void;
  setFavorite: () => void;
  active: string;
  isAuthorizationRequired: boolean;
  errorMessage: string;
  user: any;
  moviesShowLimit: number;
  checkSession: () => void;
}

class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      movies,
      tryLogin,
      errorMessage,
      user,
      promoMovie,
      isAuthorizationRequired,
    } = this.props;

    const PrivateMyList = withPrivatePath(MyList);
    // const PrivateReviewAdd = withPrivatePath(ReviewAdd);
    const WithPlayerMainPage = withFullScreenPlayer(MainPage);
    const WithPlayerMoviePage = withFullScreenPlayer(MoviePageDetails);

    return (
      <Switch>
        <Route path='/' exact render={() => <WithPlayerMainPage currentMovie={promoMovie} />} />
        <Route
          path='/login'
          render={() => (
            <SignIn
              onLogin={tryLogin}
              message={errorMessage}
              user={user}
              isAuthorizationRequired={isAuthorizationRequired}
            />
          )}
        />
        <Route path='/favorites' exact render={() => <PrivateMyList user={user} />} />
        <Route
          path='/film/:id/review/add'
          render={route => {
            const routeId = route.match.params.id;
            const currentMovie = getMovie(movies, getAdaptedRouteId(routeId));
            return <ReviewAdd user={user} movie={currentMovie} id={routeId} />;
          }}
        />
        <Route
          path='/film/:id/'
          exact
          render={route => {
            const currentMovie = getMovie(movies, getAdaptedRouteId(route.match.params.id));
            return <WithPlayerMoviePage currentMovie={currentMovie} />;
          }}
        />
      </Switch>
    );
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
    promoMovie: getAdaptedPromoMovie(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: genre => dispatch(GenreActionCreator.changeGenre(genre)),
    tryLogin: userData => dispatch(OperationUser.tryLogin(userData)),
    checkSession: () => dispatch(OperationUser.checkSession()),
    setNewShowLimit: limit => dispatch(DataActionCreator.setMoviesShowLimit(limit)),
    setFavorite: movie => dispatch(OperationData.toggleMovieFavorite(movie)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export { App };
