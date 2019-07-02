import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as reactRouter from 'react-router-dom';
import { SignIn } from './sign-in';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

const mockHistory = {
  location: {
    state: {
      from: {
        pathname: `/test/`,
      },
    },
  },
};
const mockHandle = jest.fn();

it(`SignIn correctly renders with required authorization:`, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <SignIn
          isAuthorizationRequired={true}
          history={mockHistory}
          onLogin={mockHandle}
          message={`Sign in here`}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn correctly renders with message: \'Sign in here\' text props: `, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <SignIn
          isAuthorizationRequired={true}
          history={mockHistory}
          onLogin={mockHandle}
          message={`Sign in here`}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn correctly renders with required authorization without message: `, () => {
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <SignIn
          isAuthorizationRequired={true}
          history={mockHistory}
          onLogin={mockHandle}
          message={``}
        />
      </MockBrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
