import * as React from 'react';
import * as renderer from 'react-test-renderer';
import mockData from '../../mocks/test-mocks.js';
import { MoviePageDetails } from './movie-page-details';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

it(`MoviePageDetails without user correctly renders after relunch: `, () => {
  const tree = renderer.create(
    <MockBrowserRouter>
      <MoviePageDetails
        movie={mockData.film}
        id={`0`}
        user={null}
      />
    </MockBrowserRouter>
  )

  expect(tree).toMatchSnapshot();
});

it(`MoviePageDetails with user correctly renders after relunch: `, () => {
  const tree = renderer.create(
    <MockBrowserRouter>
      <MoviePageDetails
        movie={mockData.film}
        id={`3`}
        user={{ id: 5 }}
      />
    </MockBrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
