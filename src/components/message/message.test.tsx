import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Message from './message';

it(`Message correctly render text:`, () => {
  const tree = renderer.create(
    <Message
      text={`is correct message`}
      style={``}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
