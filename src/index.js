import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import App from './components/app/app.jsx';
const entryPoint = document.getElementById(`root`);

const init = () => {
  ReactDOM.render(<App />, entryPoint);
};

init();
