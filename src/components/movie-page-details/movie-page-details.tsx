import * as React from 'react';
import UserBlock from '../user-block/user-block';
import MoviePageTab from '../movie-page-tab/movie-page-tab';
import withActiveItem from '../../hocs/with-active-item';
import { Tab, Review } from '../../types';
import { compose, withProps } from 'recompose';
import MoviesList from '../movies-list/movies-list';
import MoviesListLikeThis from '../movies-list-like-this/movies-list-like-this';
import { getLimitedItems } from '../../utils/get-limited-items';
import { getFiltredMovies } from '../../utils/get-filtred-movies';
import { excludeItemById } from '../../utils/exclude-item-by-id';
import { Movie } from '../../types';
import { Link } from 'react-router-dom';
import { withSVG } from '../../hocs/with-svg';
import { connect } from 'react-redux';
import {
  getAdaptedMovies,
  getMovieComments,
  getLoadingStatus,
  // getIsCommentsLoaded,
} from '../../reducers/data/selectors';
import { getUser, getAuthorizationRequired } from '../../reducers/user/selectors';
import { ActionCreator as DataActionCreator } from '../../reducers/data/data.js';
import { Operation as OperationData } from '../../reducers/data/data.js';
import { withRouter } from 'react-router-dom';
import Footer from '../footer/footer';

const MOVIES_LIKE_THIS_LIMIT = 4;

interface Props {
  movies: Movie[];
  currentMovie: Movie;
  comments: Review[];
  user: {} | null;
  isLoading: boolean;
  // isCommentsLoaded: boolean;
  onPlayStart: () => void;
  // resetComments: () => void;
  setFavoriteMovie: (param: string) => void;
  onFavoriteCLick: ({ id: number, isFavorite: boolean }) => void;
  // history: any;
}

class MoviePageDetails extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.handleMyListClick = this.handleMyListClick.bind(this);
    this.toggleSVG = this.toggleSVG.bind(this);
    this.renderReviewLink = this.renderReviewLink.bind(this);
    this.getSimilarGenreMovies = this.getSimilarGenreMovies.bind(this);
  }
  private handleMyListClick(evt) {
    const { setFavoriteMovie } = this.props;
    const { isFavorite, id } = this.props.currentMovie;
    evt.preventDefault();
    isFavorite ? setFavoriteMovie(`${id}/0`) : setFavoriteMovie(`${id}/1`);
  }

  private toggleSVG = () => {
    const { isFavorite } = this.props.currentMovie;
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

  private renderReviewLink() {
    const { id } = this.props.currentMovie;
    const { user } = this.props;
    return user ? (
      <Link to={`/film/:${id}/review/add`} className='btn movie-card__button'>
        Add review
      </Link>
    ) : (
      <div />
    );
  }

  private getSimilarGenreMovies() {
    const { id, genre } = this.props.currentMovie;
    const { movies } = this.props;
    return getLimitedItems(
      MOVIES_LIKE_THIS_LIMIT,
      excludeItemById(id, getFiltredMovies(genre, movies))
    );
  }

  render() {
    const { onPlayStart, currentMovie, comments, isLoading } = this.props;

    const { backgroundImg, title, genre, releseYear, poster } = currentMovie;

    const similarGenreMovies = this.getSimilarGenreMovies();

    const WrappedMoviePageTab = withActiveItem(MoviePageTab);
    const moviesListLikeThis = compose(
      withActiveItem,
      withProps({ movies: [...similarGenreMovies] })
    );

    const WrappedMoviesList = moviesListLikeThis(MoviesList);

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
                    onClick={this.handleMyListClick}
                    className='btn btn--list movie-card__button'
                    type='button'
                  >
                    {this.toggleSVG()}
                    <span>My list</span>
                  </button>
                  {this.renderReviewLink()}
                </div>
              </div>
            </div>
          </div>

          <div className='movie-card__wrap movie-card__translate-top'>
            <div className='movie-card__info'>
              <div className='movie-card__poster movie-card__poster--big'>
                <img src={poster.src} alt={poster.alt} width='218' height='327' />
              </div>

              <WrappedMoviePageTab
                movie={currentMovie}
                active={Tab.OWERVIEW}
                comments={comments}
                isLoading={isLoading}
              />
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
  }
}

const mapStateToProps = state => {
  return {
    movies: getAdaptedMovies(state),
    user: getUser(state),
    comments: getMovieComments(state),
    isLoading: getLoadingStatus(state),
    // isCommentsLoaded: getIsCommentsLoaded(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFavoriteCLick: movie => dispatch(DataActionCreator.toggleMovieFavorite(movie)),
    setFavoriteMovie: subPath => dispatch(OperationData.setFavoriteMovie(subPath)),
    // resetComments: () => dispatch(DataActionCreator.resetStateMovieComments()),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withSVG
)(MoviePageDetails);
export { MoviePageDetails };
