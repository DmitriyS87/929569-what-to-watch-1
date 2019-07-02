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

const mockServerSideFilms = [
  {
    name: `Aviator`,
    [`preview_image`]: `img/aviator.jpg`,
    id: 0,
    genre: `Adventure`,
    director: `Test person`,
    description: `Test text about current movie`,
    releseYear: `1917`,
    rating: 15,
    starring: [`Best Artist`, `Best Acter`, `Best Person`],
  },
  {
    name: `Pulp Fiction`,
    [`preview_image`]: `img/pulp-fiction.jpg`,
    id: 1,
    genre: `Western`,
    director: `Test person`,
    description: `Test text about current movie Pulp Fiction`,
    releseYear: `1905`,
    rating: 100,
    starring: [
      `The Best of the Best Artist`,
      `The Best of the Best Acter`,
      `The Best of the Best Person`,
    ],
  },
  {
    name: `Aviator CLONE`,
    [`preview_image`]: `img/aviator.jpg`,
    id: 2,
    genre: `Adventure`,
    director: `Test person`,
    description: `Test text about current movie`,
    releseYear: `1917`,
    rating: 15,
    starring: [`Best Artist`, `Best Acter`, `Best Person`],
  },
];

it(`App correctly renders MainPage without user logon`, () => {
  const mockFunction = jest.fn();
  const store = getMockStore({
    USER: {
      isAuthorizationRequired: true,
      user: null,
    },
    DATA: { movies: mockServerSideFilms, moviesShowLimit: 20, promoMovie: mockData.film },
    GENRE: { genre: mockData.activeGenre },
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
    DATA: { movies: mockServerSideFilms, moviesShowLimit: 20, promoMovie: mockData.film },
    GENRE: { genre: mockData.activeGenre },
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
