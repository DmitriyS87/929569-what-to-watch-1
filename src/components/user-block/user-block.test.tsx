import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { UserBlock } from './user-block';

import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

const mockHistory = {
  push: jest.fn(),
};

it(`UserBlock correctly renders with logouted user: `, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <UserBlock history={mockHistory} user={null} isAuthorizationRequired={true} />
      </MockBrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders with logined user: `, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <UserBlock history={mockHistory} user={{ id: `mock` }} isAuthorizationRequired={false} />
      </MockBrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
