import * as React from 'react';
import MoviesList from '../movies-list/movies-list';
import GenresList from '../genres-list/genres-list';
import withActiveItem from '../../hocs/with-active-item';
import { withSVG } from '../../hocs/with-svg';
import { Movie } from '../../types';
import UserBlock from '../user-block/user-block';
import { compose, withProps } from 'recompose';
import { getFiltredMovies } from '../../utils/get-filtred-movies';
import { getLimitedItems } from '../../utils/get-limited-items';
import ShowMoreButton from '../show-more-button/show-more-button';
import Footer from '../footer/footer';
import { connect } from 'react-redux';
import {
  getAdaptedMovies,
  getMoviesShowLimit,
  getAdaptedPromoMovie,
} from '../../reducers/data/selectors';
import { getUser } from '../../reducers/user/selectors';
import { getGenre } from '../../reducers/genre/selectors';
import { ActionCreator as DataActionCreator } from '../../reducers/data/data.js';
import { ActionCreator as GenreActionCreator } from '../../reducers/genre/genre';
interface Props {
  movies: Movie[];
  currentMovie: Movie;
  active: string;
  setGenre: () => void;
  setShowLimit: () => void;
  onPlayStart: () => void;
  user: any;
  moviesLimit: number;
}

const MainPage = (props: Props) => {
  const { movies, setGenre, active, moviesLimit, setShowLimit, onPlayStart, currentMovie } = props;

  const GenersListWrapped = withActiveItem(GenresList);
  const filtredMovies = getLimitedItems(moviesLimit, getFiltredMovies(active, movies));
  const MoviesListWrapped = compose(
    withActiveItem,
    withProps({ movies: filtredMovies })
  )(MoviesList);

  return (
    <React.Fragment>
      <section className='movie-card'>
        <div className='movie-card__bg'>
          <img src='img/bg-the-grand-budapest-hotel.jpg' alt='The Grand Budapest Hotel' />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header movie-card__head'>
          <div className='logo'>
            <a className='logo__link'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>

          <UserBlock />
        </header>

        <div className='movie-card__wrap'>
          <div className='movie-card__info'>
            <div className='movie-card__poster'>
              <img
                src='img/the-grand-budapest-hotel-poster.jpg'
                alt='The Grand Budapest Hotel poster'
                width='218'
                height='327'
              />
            </div>

            <div className='movie-card__desc'>
              <h2 className='movie-card__title'>{currentMovie.title}</h2>
              <p className='movie-card__meta'>
                <span className='movie-card__genre'>{currentMovie.genre}</span>
                <span className='movie-card__year'>{currentMovie.releseYear}</span>
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
                <button className='btn btn--list movie-card__button' type='button'>
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add' />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <GenersListWrapped movies={movies} setGenre={setGenre} active={active} />
          <MoviesListWrapped movies={movies} activeGenre={active} />
          <ShowMoreButton movies={movies} limit={moviesLimit} setNewShowLimit={setShowLimit} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    movies: getAdaptedMovies(state),
    active: getGenre(state),
    user: getUser(state),
    moviesLimit: getMoviesShowLimit(state),
    currentMovie: getAdaptedPromoMovie(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGenre: (genre: string) => dispatch(GenreActionCreator.changeGenre(genre)),
    setShowLimit: (limit: number) => dispatch(DataActionCreator.setMoviesShowLimit(limit)),
  };
};

const enhance = compose(
  withSVG,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(MainPage);
export { MainPage };
