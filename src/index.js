import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import App from './components/app/app.jsx';

const entryPoint = document.getElementById(`root`);

const init = () => {
  const data = {
    movies: {
      names: [
        `Fantastic Beasts: The Crimes of Grindelwald`,
        `Bohemian Rhapsody`,
        `Macbeth`,
        `Aviator`,
        `We need to talk about Kevin`,
        `What We Do in the Shadows`,
        `Revenant`,
        `Johnny English`,
        `Shutter Island`,
        `Pulp Fiction`,
        `No Country for Old Men`,
        `Snatch`,
        `Moonrise Kingdom`,
        `Seven Years in Tibet`,
        `Midnight Special`,
        `War of the Worlds`,
        `Dardjeeling Limited`,
        `Orlando`,
        `Mindhunter`,
        `Midnight Special`
      ]
    }
  };

  ReactDOM.render(<App data={data} />, entryPoint);
};

init();
