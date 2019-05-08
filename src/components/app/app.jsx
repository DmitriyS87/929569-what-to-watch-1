import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main/main-page.jsx';


const App = (props) => {
  const {movies} = props;

  return (
    <MainPage movies={movies} />
  );
};

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
