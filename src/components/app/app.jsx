import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main/main-page.jsx';


const App = (props) => {
  const {data} = props;

  return (
    <MainPage movies={data.movies.names} />
  );
};

App.propTypes = {
  data: PropTypes.object.isRequired
};

export default App;
