import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { App } from './app';
import mockData from '../../mocks/test-mocks';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

it(`App correctly renders MainPage without user logon`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <App
          movies={mockData.films}
          active={mockData.activeGenre}
          isAuthorizationRequired={false}
          setGenre={mockFunction}
          tryLogin={mockFunction}
          errorMessage={``}
          checkUser={mockFunction}
          user={null}
        />
      </MockBrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders MainPage with user logon`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <App
          movies={mockData.films}
          active={mockData.activeGenre}
          isAuthorizationRequired={false}
          setGenre={mockFunction}
          tryLogin={mockFunction}
          checkUser={mockFunction}
          errorMessage={``}
          user={{ id: `mock` }}
        />
      </MockBrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
