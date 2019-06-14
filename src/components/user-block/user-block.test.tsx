import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UserBlock from './user-block';

import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

it(`UserBlock correctly renders with logouted user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
    <MockBrowserRouter>
      <UserBlock
        loginUser={mockHandler}
        user={null}
      />
    </MockBrowserRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders with logined user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
    <MockBrowserRouter>
      <UserBlock
        loginUser={mockHandler}
        user={{ id: `mock` }}
      />
    </MockBrowserRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
