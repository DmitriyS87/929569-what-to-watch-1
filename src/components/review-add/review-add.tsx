import * as React from 'react';
import { Link } from 'react-router-dom';
import UserBlock from '../user-block/user-block';
import { Movie } from '../../types';
import { createAPI } from '../../api';
import Message from '../message/message'; // sign-in__message
import { getMessageFromObject } from '../../utils/get-message-from-object';

const RATING_RATIO = [1, 2, 3, 4, 5];

interface Props {
  user: {} | null;
  movie: Movie;
  id: number;
}

interface State {
  rating: number | null;
  comment: string;
  formError: { rating: string; comment: string };
  formValid: boolean;
  ratingError: boolean;
  commentError: boolean;
}

class ReviewAdd extends React.PureComponent<Props, State> {
  // private reviewTextArea = createRef<any>();
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      comment: ``,
      formError: { rating: `Please set rating`, comment: `You must type min 50 symbols` },
      formValid: false,
      ratingError: true,
      commentError: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  private validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formError;
    let commentError = this.state.commentError;
    let ratingError = this.state.ratingError;

    switch (fieldName) {
      case 'rating':
        ratingError = value ? false : true;
        fieldValidationErrors.rating = ratingError ? `Please set rating` : ``;
        break;
      case 'review-text':
        commentError = value.length >= 50 ? false : true;
        !commentError && (commentError = value.length < 400 ? false : true);
        fieldValidationErrors.comment = commentError
          ? `Review length may be from 50 to 400 symbols`
          : ``;
        break;
      default:
        break;
    }
    this.setState(
      { formError: fieldValidationErrors, commentError: commentError, ratingError: ratingError },
      () => {
        this.validateForm();
      }
    );
  }

  private validateForm() {
    this.setState({ formValid: !this.state.commentError && !this.state.ratingError });
  }

  render() {
    const { backgroundImg, title, id, poster } = this.props.movie;
    const { formValid } = this.state;
    return (
      <section className='movie-card movie-card--full'>
        <div className='movie-card__header'>
          <div className='movie-card__bg'>
            <img src={backgroundImg.src} alt={backgroundImg.alt} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header'>
            <div className='logo'>
              <Link to='/' className='logo__link'>
                <span className='logo__letter logo__letter--1'>W</span>
                <span className='logo__letter logo__letter--2'>T</span>
                <span className='logo__letter logo__letter--3'>W</span>
              </Link>
              <a href='main.html' />
            </div>

            <nav className='breadcrumbs'>
              <ul className='breadcrumbs__list'>
                <li className='breadcrumbs__item'>
                  <Link className='breadcrumbs__link' to={`/film/:${id}`}>
                    {title}
                  </Link>
                </li>
                <li className='breadcrumbs__item'>
                  <a className='breadcrumbs__link'>Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock />
          </header>

          <div className='movie-card__poster movie-card__poster--small'>
            <img src={poster.src} alt={poster.alt} width='218' height='327' />
          </div>
        </div>

        <div className='add-review'>
          <form action='#' className='add-review__form' onSubmit={this.handleSubmit}>
            <div className='rating'>
              <div className='rating__stars'>
                {RATING_RATIO.map((count, idx) => {
                  return (
                    <React.Fragment key={`ReviewAddFragmentRatingMovie${id}Row${idx}`}>
                      <input
                        className='rating__input'
                        id={`star-${count}`}
                        type='radio'
                        name='rating'
                        value={count}
                        defaultChecked={this.state.rating === count ? true : false}
                        onChange={this.handleRatingChange}
                      />
                      <label className='rating__label' htmlFor={`star-${count}`}>
                        Rating {count}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className='add-review__text'>
              <textarea
                className='add-review__textarea'
                name='review-text'
                id='review-text'
                placeholder='Review text'
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <div className='add-review__submit'>
                <button className='add-review__btn' type='submit' disabled={!formValid}>
                  Post
                </button>
              </div>
            </div>

            <Message
              text={getMessageFromObject(this.state.formError)}
              style={'.sign-in__error-message'}
            />
          </form>
        </div>
      </section>
    );
  }

  handleChange(evt) {
    evt.persist();
    this.setState({ comment: evt.target.value }, () =>
      this.validateField(evt.target.name, evt.target.value)
    );
  }

  handleSubmit(evt) {
    evt.persist();
    evt.preventDefault();
    if (this.state.formValid) {
      evt.target.disabled = true;
      const api = createAPI();
      const data = {
        rating: this.state.rating,
        comment: this.state.comment,
      };
      return api.post(`/comments/${this.props.movie.id}`, data).then(response => {
        console.log(response);
      });
    }
  }

  handleRatingChange(evt) {
    evt.persist();
    this.setState({ rating: evt.target.value }, () =>
      this.validateField(evt.target.name, evt.target.value)
    );
  }
}

export default ReviewAdd;
