import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer, Operation} from './reducers/reducer';
import {createAPI} from './api';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

const entryPoint = document.getElementById(`root`);


const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  store.dispatch(Operation.loadMovies());
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, entryPoint);
};

init();
