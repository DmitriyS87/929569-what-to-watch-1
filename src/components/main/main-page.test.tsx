import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import MainPage from './main-page';
import mockData from '../../mocks/test-mocks.js';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

it(`MainPage correctly renders without user and without ShowMoreButton`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
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
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with user login and without ShowMoreButton`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
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
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with moviesLimited to 1 with ShowMoreButton`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
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
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
