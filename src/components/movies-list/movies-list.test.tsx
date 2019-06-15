import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MoviesList from './movies-list';
import TEST_MOCKS from '../../mocks/test-mocks.js';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

it(`MoviesList correctly renders after relunch`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <MoviesList
          movies={TEST_MOCKS.films}
          setActive={mockHandle}
          activeGenre={TEST_MOCKS.activeGenre}
          activeItem={null}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
