import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../message/message.jsx';

it(`Message correctly render text:`, () => {
  const tree = renderer.create(
      <Message
        text={`is correct message`}
        style={``}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
