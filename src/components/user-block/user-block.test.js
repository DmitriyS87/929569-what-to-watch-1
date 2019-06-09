import React from 'react';
import renderer from 'react-test-renderer';
import UserBlock from '../user-block/user-block.jsx';

import reactRouter from 'react-router-dom';
import PropTypes from 'prop-types';

const {MemoryRouter} = reactRouter;
const MockBrowserRouter = ({children}) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);
MockBrowserRouter.propTypes = {
  children: PropTypes.node.isRequired,
};


it(`UserBlock correctly renders with logouted user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
      <MemoryRouter>
        <UserBlock
          loginUser={mockHandler}
          user={null}
        />
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`UserBlock correctly renders with logined user: `, () => {
  const mockHandler = jest.fn();
  const tree = renderer.create(
      <MemoryRouter>
        <UserBlock
          loginUser={mockHandler}
          user={{id: `mock`}}
        />
      </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
