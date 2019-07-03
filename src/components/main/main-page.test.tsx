import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { MainPage } from './main-page';
import { Provider } from 'react-redux';
import mockData from '../../mocks/test-mocks.js';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

it(`MainPage correctly renders without user and without ShowMoreButton`, () => {
  const mockStore = configureStore();
  const getState = {
    USER: {
      user: null,
    },
  };
  const store = mockStore(getState);
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <MainPage
            currentMovie={mockData.film}
            onPlayStart={jest.fn()}
            movies={mockData.films}
            moviesLimit={3}
            setShowLimit={mockHandle}
            setGenre={mockHandle}
            active={mockData.activeGenre}
            user={null}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with user login and without ShowMoreButton`, () => {
  const mockStore = configureStore();
  const getState = {
    USER: {
      user: { id: 1 },
    },
  };
  const store = mockStore(getState);
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <Provider store={store}>
          <MainPage
            currentMovie={mockData.film}
            onPlayStart={jest.fn()}
            movies={mockData.films}
            moviesLimit={3}
            setShowLimit={mockHandle}
            setGenre={mockHandle}
            active={mockData.activeGenre}
            user={{ id: 1 }}
          />
        </Provider>
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with moviesLimited to 1 with ShowMoreButton`, () => {
  const mockStore = configureStore();
  const getState = {
    USER: {
      user: { id: 1 },
    },
  };
  const store = mockStore(getState);
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <MainPage
            currentMovie={mockData.film}
            onPlayStart={jest.fn()}
            movies={mockData.films}
            moviesLimit={1}
            setShowLimit={mockHandle}
            setGenre={mockHandle}
            active={mockData.activeGenre}
            user={{ id: 1 }}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
