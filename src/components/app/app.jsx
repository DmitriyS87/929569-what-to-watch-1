import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main/main-page.jsx';


const App = (props) => {
  const {movies} = props;
  const clickHandler = (evt) => {
    return evt.preventDefault();
  };
  return (
    <MainPage movies={movies} onClick={clickHandler} />
  );
};

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
