import * as React from 'react';
import UserBlock from '../user-block/user-block';
import { connect } from 'react-redux';
import { getMovie } from '../../reducers/data/selectors';
import { getUser } from '../../reducers/user/selectors';
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

const MOVIES_LIKE_THIS_LIMIT = 4;

interface Props {
  movie: Movie,
  movies: Movie[],
  id: string,
  user: {} | null,
}

const MoviePageDetails = (props: Props) => {
  const { user, movies } = props;
  const { backgroundImg, title, genre, releseYear, poster, id } = props.movie;

  const moviesForListLikeThis = getLimitedItems(MOVIES_LIKE_THIS_LIMIT, excludeItemById(id, getFiltredMovies(genre, movies)));

  const WrappedMoviePageTab = withActiveItem(MoviePageTab, Tab.OWERVIEW)
  const moviesListLikeThis = compose(withActiveItem, withProps({ movies: [...moviesForListLikeThis] }));
  const WrappedMoviesList = moviesListLikeThis(MoviesList);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImg.src} alt={backgroundImg.alt} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <UserBlock user={user} />
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releseYear}</span>
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
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>

        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster.src} alt={poster.alt} width="218" height="327" />
            </div>

            <WrappedMoviePageTab navItems={TABS} movie={props.movie} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <MoviesListLikeThis>
          <WrappedMoviesList />
        </MoviesListLikeThis>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: getMovie(state, parseInt(ownProps.id.slice(1, ownProps.id.length))),
    user: getUser(state),
  };
};

export default connect(mapStateToProps)(MoviePageDetails);
export { MoviePageDetails };
