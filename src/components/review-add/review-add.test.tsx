import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewAdd from './review-add';
import mockData from '../../mocks/test-mocks.js';
import * as reactRouter from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

const mockStore = configureStore();
const getState = {
  USER: {
    isAuthorizationRequired: false,
    user: {},
  },
};

const store = mockStore(getState);

it(`ReviewAdd correctly renders after relunch: `, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <ReviewAdd movie={mockData.film} id={0} user={{}} />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
