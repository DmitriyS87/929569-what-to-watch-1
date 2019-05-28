import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main/main-page.jsx';


const App = (props) => {
  const {movies} = props;
  const clickHandler = () => {
  };
  return (
    <MainPage movies={movies} onClick={clickHandler} />
  );
};

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
