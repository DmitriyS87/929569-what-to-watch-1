import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import MainPage from './main-page';
import TEST_MOCKS from '../../mocks/test-mocks.js';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

it(`MainPage correctly renders without user`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <MainPage
          movies={TEST_MOCKS.films}
          setGenre={mockHandle}
          active={TEST_MOCKS.activeGenre}
          user={null}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with user login`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <MainPage
          movies={TEST_MOCKS.films}
          setGenre={mockHandle}
          active={TEST_MOCKS.activeGenre}
          user={{ id: 1 }}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
