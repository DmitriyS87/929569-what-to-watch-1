import * as React from 'react';
import * as reactRouter from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import Footer from './footer';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

it(`Footer correctly renders after relunch`, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <Footer />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
