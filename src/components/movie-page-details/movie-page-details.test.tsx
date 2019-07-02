import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../mocks/test-mocks.js';
import { MoviePageDetails } from './movie-page-details';
import { Provider } from 'react-redux';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

const mockHandler = jest.fn();
const mockHistory = {
  location: {
    state: {
      from: {
        pathname: `/fromtest/`,
      },
    },
  },
};
const mockStore = configureStore();

it(`MoviePageDetails without user correctly renders after relunch: `, () => {
  const getState = {
    USER: {
      isAuthorizationRequired: true,
      user: null,
    },
  };
  const store = mockStore(getState);
  const mockMatch = {
    params: {
      id: `:0`,
    },
  };
  const tree = renderer.create(
    <Provider store={store}>
      <MockBrowserRouter>
        <MoviePageDetails
          onFavoriteCLick={mockHandler}
          onPlayStart={mockHandler}
          movies={mockData.films}
          user={null}
          history={mockHistory}
          match={mockMatch}
          isAuthorizationRequired={true}
          onAccessDenied={mockHandler}
        />
      </MockBrowserRouter>
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});

it(`MoviePageDetails with user correctly renders after relunch: `, () => {
  const getState = {
    USER: {
      isAuthorizationRequired: true,
      user: { id: 5 },
    },
  };
  const store = mockStore(getState);
  const mockMatch = {
    params: {
      id: `:2`,
    },
  };
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <MoviePageDetails
            onFavoriteCLick={mockHandler}
            onPlayStart={mockHandler}
            movies={mockData.films}
            user={{ id: 5 }}
            history={mockHistory}
            match={mockMatch}
            isAuthorizationRequired={false}
            onAccessDenied={mockHandler}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
