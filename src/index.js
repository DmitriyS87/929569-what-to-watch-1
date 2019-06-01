import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducers/reducer';

const entryPoint = document.getElementById(`root`);
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, entryPoint);
};

init();
