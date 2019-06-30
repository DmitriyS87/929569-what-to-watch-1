import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewAdd from './review-add';
import mockData from '../../mocks/test-mocks.js';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

it(`ReviewAdd correctly renders after relunch: `, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <ReviewAdd movie={mockData.film} id={0} user={{}} />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
