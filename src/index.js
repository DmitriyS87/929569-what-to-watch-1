import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducer} from './reducers/reducer';

const logger = createLogger();

const entryPoint = document.getElementById(`root`);
const store = createStore(reducer, applyMiddleware(thunk, logger));

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, entryPoint);
};

init();
