import * as React from 'react';
import { Movie, Review } from '../../types';
import { TABS } from '../../constants/movie-page-tab.constant';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Operation as OperationData } from '../../reducers/data/data.js';
import { getStringRating } from '../../utils/get-string-rating';
import { getMovieLengthFormat } from '../../utils/get-movie-length-format';

interface Props {
  activeItem: string;
  movie: Movie;
  comments: Review[] | null;
  isLoading: boolean;
  loadMovieComments: (id: number) => void;
}

interface PropsNav {
  setActive: (param: string) => void;
}

const MoviePageTab = (props: Props & PropsNav) => {
  const { activeItem, setActive, movie, comments, isLoading, loadMovieComments } = props;
  const handleClick = evt => {
    evt.preventDefault();
    setActive(evt.target.textContent);
  };

  const ScreenTab = (props: Props) => {
    const {
      genre,
      releseYear,
      director,
      starring,
      runTime,
      rating,
      scoresCount,
      description,
      id,
    } = props.movie;
    const { comments, isLoading, loadMovieComments } = props;
    const descriptions = description.split('. ');

    if (!isLoading && !comments) {
      loadMovieComments(id);
    }

    const sortComentsByDate = (reviews: Review[]): Review[] => {
      return reviews.sort((a, b) => {
        if (Date.parse(a.date) > Date.parse(b.date)) {
          return -1;
        }
        if (Date.parse(a.date) < Date.parse(b.date)) {
          return 1;
        }
        return 0;
      });
    };

    const halveComments = (comments: Review[]): { left: Review[]; right: Review[] } => {
      const columns: { left: Review[]; right: Review[] } = {
        left: [],
        right: [],
      };
      let left = false;
      const toggleLeft: () => void = () => {
        left = !left;
      };
      for (let comment of comments) {
        toggleLeft();
        if (left) {
          columns.left.push(comment);
        }
        if (!left) {
          columns.right.push(comment);
        }
      }
      return columns;
    };

    const computedComments: any = isLoading
      ? { left: [`Loading... Please wait`], right: [] }
      : comments === null
      ? { left: [`no coments here. Would you like to smthn to type?! Be first!`], right: [] }
      : halveComments(sortComentsByDate(comments));

    const makeReview = (reviewData, key) => {
      const reviewDate = Date.parse(reviewData.date);
      return (
        <div key={key} className='review'>
          <blockquote className='review__quote'>
            <p className='review__text'>{reviewData.comment}</p>

            <footer className='review__details'>
              <cite className='review__author'>{reviewData.user.name}</cite>
              <time className='review__date' dateTime={moment(reviewDate).format(`YYYY-MM-DD`)}>
                {moment(reviewDate).format(`MMMM D, YYYY`)}
              </time>
            </footer>
          </blockquote>

          <div className='review__rating'>{reviewData.rating}</div>
        </div>
      );
    };

    switch (props.activeItem) {
      case `Overview`:
        return (
          <React.Fragment>
            <div className='movie-rating'>
              <div className='movie-rating__score'>{rating.toFixed(1)}</div>
              <p className='movie-rating__meta'>
                <span className='movie-rating__level'>{getStringRating(rating)}</span>
                <span className='movie-rating__count'>{scoresCount} ratings</span>
              </p>
            </div>

            <div className='movie-card__text'>
              {descriptions.map((paragraph, idx) => {
                return <p key={`DescriptionMovie_${idx}`}>{paragraph}</p>;
              })}
              <p className='movie-card__director'>
                <strong>Director: {director}</strong>
              </p>
              <p className='movie-card__starring'>
                <strong>
                  Starring:{' '}
                  {starring.map((it, idx, arr) => `${it}${idx < arr.length - 1 ? ',' : ''}`)} and
                  other
                </strong>
              </p>
            </div>
          </React.Fragment>
        );

      case `Details`:
        return (
          <div className='movie-card__text movie-card__row'>
            <div className='movie-card__text-col'>
              <p className='movie-card__details-item'>
                <strong className='movie-card__details-name'>Director</strong>
                <span className='movie-card__details-value'>{director}</span>
              </p>
              <p className='movie-card__details-item'>
                <strong className='movie-card__details-name'>Starring</strong>
                <span className='movie-card__details-value'>
                  {starring.map((artist, idx, array) => {
                    if (idx === array.length - 1) {
                      return `${artist}`;
                    }
                    return (
                      <React.Fragment key={`artist${artist}${idx}`}>
                        {`${artist}`} <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </p>
            </div>

            <div className='movie-card__text-col'>
              <p className='movie-card__details-item'>
                <strong className='movie-card__details-name'>Run Time</strong>
                <span className='movie-card__details-value'>{getMovieLengthFormat(runTime)}</span>
              </p>
              <p className='movie-card__details-item'>
                <strong className='movie-card__details-name'>Genre</strong>
                <span className='movie-card__details-value'>{genre}</span>
              </p>
              <p className='movie-card__details-item'>
                <strong className='movie-card__details-name'>Released</strong>
                <span className='movie-card__details-value'>{releseYear}</span>
              </p>
            </div>
          </div>
        );
      case `Reviews`:
        return (
          <div className='movie-card__reviews movie-card__row'>
            <div className='movie-card__reviews-col'>
              {computedComments.left.map((comment, idx) =>
                makeReview(comment, `computedCommentsleft${idx}`)
              )}
            </div>
            <div className='movie-card__reviews-col'>
              {computedComments.right.map((comment, idx) =>
                makeReview(comment, `computedCommentsRight${idx}`)
              )}
            </div>
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <React.Fragment>
      <div className='movie-card__desc'>
        <nav className='movie-nav movie-card__nav'>
          <ul className='movie-nav__list'>
            {TABS.map((it, idx) => {
              return (
                <li
                  key={`MNL-${it}-${idx}`}
                  className={`movie-nav__item ${
                    it === activeItem ? `movie-nav__item--active` : ``
                  }`}
                >
                  <a href='#' onClick={handleClick} className='movie-nav__link'>
                    {it}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <ScreenTab
          movie={movie}
          activeItem={activeItem}
          comments={comments}
          isLoading={isLoading}
          loadMovieComments={loadMovieComments}
        />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loadMovieComments: id => dispatch(OperationData.getMovieComments(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MoviePageTab);
export { MoviePageTab };
