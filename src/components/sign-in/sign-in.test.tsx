import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { SignIn } from './sign-in';

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
      <SignIn
        isAuthorizationRequired={true}
        history={mockHistory}
        onLogin={mockHandle}
        message={`Sign in here`}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn correctly renders with message: \'Sign in here\' text props: `, () => {
  const tree = renderer
    .create(
      <SignIn
        isAuthorizationRequired={true}
        history={mockHistory}
        onLogin={mockHandle}
        message={`Sign in here`}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn correctly renders with required authorization without message: `, () => {
  const tree = renderer
    .create(
      <SignIn
        isAuthorizationRequired={true}
        history={mockHistory}
        onLogin={mockHandle}
        message={``}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
