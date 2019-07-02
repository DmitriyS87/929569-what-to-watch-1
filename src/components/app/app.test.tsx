import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import { App } from './app';
import mockData from '../../mocks/test-mocks';
import { getMockStore } from '../../utils/get-mock-store';
import { Provider } from 'react-redux';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

it(`App correctly renders MainPage without user logon`, () => {
  const mockFunction = jest.fn();
  const store = getMockStore({
    USER: {
      isAuthorizationRequired: true,
      user: null,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <App
            setFavorite={mockFunction}
            promoMovie={mockData.film}
            movies={mockData.films}
            moviesShowLimit={3}
            setNewShowLimit={mockFunction}
            active={mockData.activeGenre}
            isAuthorizationRequired={false}
            setGenre={mockFunction}
            tryLogin={mockFunction}
            errorMessage={``}
            checkUser={mockFunction}
            user={null}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders MainPage with user logon`, () => {
  const store = getMockStore({
    USER: { isAuthorizationRequired: false, user: { id: `mock` } },
  });
  const mockFunction = jest.fn();
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <App
            setFavorite={mockFunction}
            promoMovie={mockData.film}
            movies={mockData.films}
            moviesShowLimit={3}
            setNewShowLimit={mockFunction}
            active={mockData.activeGenre}
            isAuthorizationRequired={false}
            setGenre={mockFunction}
            tryLogin={mockFunction}
            checkUser={mockFunction}
            errorMessage={``}
            user={{ id: `mock` }}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
