import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from '../main/main-page';
import MyList from '../my-list/my-list';
import withPrivatePath from '../../hocs/with-private-path';
import withFullScreenPlayer from '../../hocs/with-fullscreen-player';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import { ActionCreator as GenreActionCreator } from '../../reducers/genre/genre';
import { Operation as OperationUser } from '../../reducers/user/user';
import {
  ActionCreator as DataActionCreator,
  Operation as OperationData,
} from '../../reducers/data/data.js';
import {
  getAdaptedMovies,
  getMoviesShowLimit,
  getAdaptedPromoMovie,
} from '../../reducers/data/selectors';
import { getErrorMessage, getUser } from '../../reducers/user/selectors';
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
  loadUserMovies: () => void;
  user: any;
  checkSession: () => void;
}
class App extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = (newProps: Props) => {
    return Object.keys(newProps).some(key => {
      if (typeof newProps[key] === 'function') {
        return false;
      }
      const result = JSON.stringify(this.props[key]) !== JSON.stringify(newProps[key]);
      return result;
    });
  };

  render() {
    const { movies, user, promoMovie, loadUserMovies } = this.props;

    const PrivateMyList = withPrivatePath(MyList);
    const PrivateReviewAdd = withPrivatePath(ReviewAdd);
    const WithPlayerMainPage = withFullScreenPlayer(MainPage);
    const WithPlayerMoviePage = withFullScreenPlayer(MoviePageDetails);

    console.log('App');

    return (
      <Switch>
        <Route path='/' exact render={() => <WithPlayerMainPage currentMovie={promoMovie} />} />
        <Route path='/login' render={() => <SignIn />} />
        <Route
          path='/favorites'
          exact
          render={() => {
            loadUserMovies();
            return <PrivateMyList user={user} />;
          }}
        />
        <Route
          path='/film/:id/review/add'
          render={route => {
            const routeId = route.match.params.id;
            const currentMovie = getMovie(movies, getAdaptedRouteId(routeId));
            return <PrivateReviewAdd user={user} movie={currentMovie} id={routeId} />;
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
    movies: getAdaptedMovies(state),
    user: getUser(state),
    promoMovie: getAdaptedPromoMovie(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkSession: () => dispatch(OperationUser.checkSession()),
    loadUserMovies: () => dispatch(OperationData.loadUserMovies()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export { App };
