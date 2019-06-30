import * as React from 'react';
import { Link } from 'react-router-dom';
import UserBlock from '../user-block/user-block';
import { Movie } from '../../types';
import { createAPI } from '../../api';

const RATING_RATIO = [1, 2, 3, 4, 5];

interface Props {
  user: {} | null;
  movie: Movie;
  id: number;
  // onSubmit: (params) => void;
}

interface State {
  rating: number;
  comment: string;
}

class ReviewAdd extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      comment: ``,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { backgroundImg, title, id, poster } = this.props.movie;

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

            <UserBlock user={null} />
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
                        onClick={this.handleClick}
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
                onChange={this.handleChange}
              />
              <div className='add-review__submit'>
                <button className='add-review__btn' type='submit'>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }

  handleChange(evt) {
    console.log(evt.target.value);
    this.setState({ comment: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const api = createAPI();
    api.post(`/comments/${this.props.movie.id}`, this.state).then(response => {
      console.log(response);
    });
  }

  handleClick(evt) {
    this.setState({ rating: evt.target.value });
  }
}

export default ReviewAdd;
