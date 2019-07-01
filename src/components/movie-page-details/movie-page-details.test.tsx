import * as React from 'react';
import * as renderer from 'react-test-renderer';
import mockData from '../../mocks/test-mocks.js';
import { MoviePageDetails } from './movie-page-details';
import * as reactRouter from 'react-router-dom';

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

it(`MoviePageDetails without user correctly renders after relunch: `, () => {
  const mockMatch = {
    params: {
      id: `:0`,
    },
  };
  const tree = renderer.create(
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
  );

  expect(tree).toMatchSnapshot();
});

it(`MoviePageDetails with user correctly renders after relunch: `, () => {
  const mockMatch = {
    params: {
      id: `:2`,
    },
  };
  const tree = renderer
    .create(
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
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
