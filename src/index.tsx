import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { Operation } from './reducers/data/data';
import { createAPI } from './api';
import thunk from 'redux-thunk';
import { compose } from 'recompose';
import { BrowserRouter } from 'react-router-dom';

const entryPoint = document.getElementById(`root`);

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const init = () => {
  const api = createAPI();
  const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), __REDUX_DEVTOOLS_EXTENSION__ ? __REDUX_DEVTOOLS_EXTENSION__() : (source) => source));
  store.dispatch(Operation.loadMovies());

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, entryPoint);
};

init();
