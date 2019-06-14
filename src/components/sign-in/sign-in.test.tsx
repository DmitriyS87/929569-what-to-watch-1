import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SignIn from './sign-in';

it(`SignIn correctly renders with message: \'Sign in here\' text props: `, () => {
  const mockHandle = jest.fn();
  const tree = renderer.create(
    <SignIn
      onLogin={mockHandle}
      message={`Sign in here`}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn correctly renders without message: `, () => {
  const mockHandle = jest.fn();
  const tree = renderer.create(
    <SignIn
      onLogin={mockHandle}
      message={``}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});