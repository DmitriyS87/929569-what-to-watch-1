import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

import films from './mocks/films.js';

const entryPoint = document.getElementById(`root`);

const init = () => {
  ReactDOM.render(<App movies={films} />, entryPoint);
};

init();
