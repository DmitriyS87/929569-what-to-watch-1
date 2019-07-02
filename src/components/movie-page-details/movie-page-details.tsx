import * as React from 'react';
import { Redirect } from 'react-router-dom';
import UserBlock from '../user-block/user-block';
import MoviePageTab from '../movie-page-tab/movie-page-tab';
import withActiveItem from '../../hocs/with-active-item';
import { Tab } from '../../types';
import { TABS } from '../../constants/movie-page-tab.constant';
import { compose, withProps } from 'recompose';
import MoviesList from '../movies-list/movies-list';
import MoviesListLikeThis from '../movies-list-like-this/movies-list-like-this';
import { getLimitedItems } from '../../utils/get-limited-items';
import { getFiltredMovies } from '../../utils/get-filtred-movies';
import { excludeItemById } from '../../utils/exclude-item-by-id';
import { Movie } from '../../types';
import { Link } from 'react-router-dom';
import { createAPI } from '../../api.js';
import { withSVG } from '../../hocs/with-svg';
import { connect } from 'react-redux';
import { getAdaptedRouteId } from '../../utils/get-adapted-route-id';
import { getMovie } from '../../utils/get-movie-from-id';
import { getAdaptedMovies } from '../../reducers/data/selectors';
import { getUser, getAuthorizationRequired } from '../../reducers/user/selectors';
import { ActionCreator as UserActionCreator } from '../../reducers/user/user.js';
import { ActionCreator as DataActionCreator } from '../../reducers/data/data.js';
import { Operation as OperationData } from '../../reducers/data/data.js';
import { checkStatusOk } from '../../utils/check-status';
import { getErrorMessage } from '../../utils/get-error-message';
import { withRouter } from 'react-router-dom';
import Footer from '../footer/footer';

const MOVIES_LIKE_THIS_LIMIT = 4;

interface Props {
  movies: Movie[];
  currentMovie: Movie;
  user: {} | null;
  isAuthorizationRequired: boolean;
  onPlayStart: () => void;
  onAccessDenied: () => void;
  onFavoriteCLick: ({ id: number, isFavorite: boolean }) => void;
  history: any;
}

const MoviePageDetails = (props: Props) => {
  const {
    user,
    movies,
    onPlayStart,
    onFavoriteCLick,
    isAuthorizationRequired,
    onAccessDenied,
    history,
    currentMovie,
  } = props;

  const { backgroundImg, title, genre, releseYear, poster, id, isFavorite } = currentMovie;

  const moviesForListLikeThis = getLimitedItems(
    MOVIES_LIKE_THIS_LIMIT,
    excludeItemById(id, getFiltredMovies(genre, movies))
  );

  const WrappedMoviePageTab = withActiveItem(MoviePageTab);
  const moviesListLikeThis = compose(
    withActiveItem,
    withProps({ movies: [...moviesForListLikeThis] })
  );
  const WrappedMoviesList = moviesListLikeThis(MoviesList);

  const reviewLink = user ? (
    <Link to={`/film/:${id}/review/add`} className='btn movie-card__button'>
      Add review
    </Link>
  ) : (
    <div />
  );

  const forMyListSVG = () => {
    return isFavorite ? (
      <svg viewBox='0 0 18 14' width='18' height='14'>
        <use xlinkHref='#in-list' />
      </svg>
    ) : (
      <svg viewBox='0 0 19 20' width='19' height='20'>
        <use xlinkHref='#add' />
      </svg>
    );
  };

  const setFavoriteMovie = subPath => {
    const api = createAPI(onAccessDenied);
    api
      .post(`/favorite/${subPath}`)
      .then(response => {
        if (checkStatusOk(response)) {
          return onFavoriteCLick(response.data);
        }
        return response;
      })
      .catch(err => {
        throw Error(err);
      });
  };

  const handleMyListClick = evt => {
    evt.preventDefault();
    isFavorite ? setFavoriteMovie(`${id}/0`) : setFavoriteMovie(`${id}/1`);
  };

  if (isAuthorizationRequired) {
    return <Redirect to={{ pathname: '/login', state: { from: history.location } }} />;
  }

  return (
    <React.Fragment>
      <section className='movie-card movie-card--full'>
        <div className='movie-card__hero'>
          <div className='movie-card__bg'>
            <img src={backgroundImg.src} alt={backgroundImg.alt} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header movie-card__head'>
            <div className='logo'>
              <a href='/' className='logo__link'>
                <span className='logo__letter logo__letter--1'>W</span>
                <span className='logo__letter logo__letter--2'>T</span>
                <span className='logo__letter logo__letter--3'>W</span>
              </a>
            </div>

            <UserBlock />
          </header>

          <div className='movie-card__wrap'>
            <div className='movie-card__desc'>
              <h2 className='movie-card__title'>{title}</h2>
              <p className='movie-card__meta'>
                <span className='movie-card__genre'>{genre}</span>
                <span className='movie-card__year'>{releseYear}</span>
              </p>

              <div className='movie-card__buttons'>
                <button
                  className='btn btn--play movie-card__button'
                  type='button'
                  onClick={onPlayStart}
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s' />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  onClick={handleMyListClick}
                  className='btn btn--list movie-card__button'
                  type='button'
                >
                  {forMyListSVG()}
                  <span>My list</span>
                </button>
                {reviewLink}
              </div>
            </div>
          </div>
        </div>

        <div className='movie-card__wrap movie-card__translate-top'>
          <div className='movie-card__info'>
            <div className='movie-card__poster movie-card__poster--big'>
              <img src={poster.src} alt={poster.alt} width='218' height='327' />
            </div>

            <WrappedMoviePageTab navItems={TABS} movie={currentMovie} active={Tab.OWERVIEW} />
          </div>
        </div>
      </section>

      <div className='page-content'>
        <MoviesListLikeThis>
          <WrappedMoviesList />
        </MoviesListLikeThis>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    movies: getAdaptedMovies(state),
    user: getUser(state),
    isAuthorizationRequired: getAuthorizationRequired(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFavoriteCLick: movie => dispatch(DataActionCreator.toggleMovieFavorite(movie)),
    onAccessDenied: () => dispatch(UserActionCreator.checkUser(true)),
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSVG
)(MoviePageDetails);
export { MoviePageDetails };
