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

const mockReview = {
  id: 0,
  user: {
    id: 10,
    name: `Bob Marley`,
  },
  rating: 4.7,
  comment: `The best movie i have seen ever! All people should see it! Awsome! Bravo! Just see it now! It was a best lifetime!`,
  date: `2019-05-08T14:13:56.569Z`,
};

const mockHandler = jest.fn();
const mockStore = configureStore();

it(`MoviePageDetails without user correctly renders after relunch: `, () => {
  const getState = {
    USER: {
      user: null,
    },
  };
  const store = mockStore(getState);
  const tree = renderer.create(
    <Provider store={store}>
      <MockBrowserRouter>
        <MoviePageDetails
          setFavoriteMovie={mockHandler}
          currentMovie={mockData.film}
          onFavoriteCLick={mockHandler}
          onPlayStart={mockHandler}
          movies={mockData.films}
          user={null}
          comments={[mockReview]}
          isLoading={false}
        />
      </MockBrowserRouter>
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});

it(`MoviePageDetails with user correctly renders after relunch: `, () => {
  const getState = {
    USER: {
      user: { id: 5 },
    },
  };
  const store = mockStore(getState);
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <MoviePageDetails
            setFavoriteMovie={mockHandler}
            currentMovie={mockData.film}
            onFavoriteCLick={mockHandler}
            onPlayStart={mockHandler}
            movies={mockData.films}
            user={{ id: 5 }}
            comments={[mockReview]}
            isLoading={false}
          />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
