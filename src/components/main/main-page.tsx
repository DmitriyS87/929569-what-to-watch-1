import * as React from 'react';
import MoviesList from '../movies-list/movies-list';
import GenresList from '../genres-list/genres-list';
import withActiveItem from '../../hocs/with-active-item';
import { Movie } from '../../types';
import UserBlock from '../user-block/user-block';
import { compose, withProps } from 'recompose';
import { getFiltredMovies } from '../../utils/get-filtred-movies';
import { getLimitedItems } from '../../utils/get-limited-items';
import ShowMoreButton from '../show-more-button/show-more-button';
interface Props {
  movies: Movie[],
  active: string,
  setGenre: () => void,
  user: any,
  moviesLimit: number
}

const MainPage = (props: Props) => {
  const { movies, setGenre, active, user, moviesLimit } = props;

  const GenersListWrapped = withActiveItem(GenresList);
  const filtredMovies = getLimitedItems(moviesLimit, getFiltredMovies(active, movies));
  const MoviesListWrapped = compose(withActiveItem, withProps({ movies: filtredMovies }))(MoviesList);

  return (<div>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <UserBlock user={user} />
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">Drama</span>
              <span className="movie-card__year">2014</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenersListWrapped movies={movies} setGenre={setGenre} active={active} />
        <MoviesListWrapped movies={movies} activeGenre={active} />
        <ShowMoreButton movies={movies} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default MainPage;
