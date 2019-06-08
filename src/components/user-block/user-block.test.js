import React from 'react';
import renderer from 'react-test-renderer';
import UserBlock from '../user-block/user-block.jsx';

it(`UserBlock correctly renders with logouted user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
      <UserBlock
        loginUser={mockHandler}
        user={null}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders with logined user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
      <UserBlock
        loginUser={mockHandler}
        user={{id: `mock`}}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
