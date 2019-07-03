import * as React from 'react';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import { getAdaptedUserMovies } from '../../reducers/data/selectors.js';
import MoviesList from '../movies-list/movies-list';
import withActiveItem from '../../hocs/with-active-item';
import { connect } from 'react-redux';
import { Movie } from '../../types';
import { Operation as OperationData } from '../../reducers/data/data.js';

interface Props {
  userMovies: Movie[];
}

const WrappedMoviesList = withActiveItem(MoviesList);

const MyList = (props: Props) => {
  const { userMovies } = props;

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <div className='logo'>
          <a href='main.html' className='logo__link'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </a>
        </div>

        <h1 className='page-title user-page__title'>My list</h1>

        <UserBlock />
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <WrappedMoviesList movies={userMovies} />
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userMovies: getAdaptedUserMovies(state),
  };
};

export default connect(mapStateToProps)(MyList);
export { MyList };
