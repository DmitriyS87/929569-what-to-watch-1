import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import reactRouter from 'react-router-dom';
import MainPage from '../main/main-page.jsx';
import TEST_MOCKS from '../../mocks/test-mocks.js';

const {MemoryRouter} = reactRouter;
const MockBrowserRouter = ({children}) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);
MockBrowserRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

it(`MainPage correctly renders without user`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
        <MemoryRouter>
          <MainPage
            movies={TEST_MOCKS.films}
            setGenre={mockHandle}
            checkUser={mockHandle}
            active={TEST_MOCKS.activeGenre}
            user={null}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`MainPage correctly renders with user login`, () => {
  const mockHandle = jest.fn();
  const tree = renderer
    .create(
        <MemoryRouter>
          <MainPage
            movies={TEST_MOCKS.films}
            setGenre={mockHandle}
            checkUser={mockHandle}
            active={TEST_MOCKS.activeGenre}
            user={{id: 1}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
