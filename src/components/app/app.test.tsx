import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { App } from './app';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>
    {children}
  </MemoryRouter>
);

const mock = {
  active: `All genres`,
  movies: [{
    title: `Aviator`,
    coverSrc: `img/aviator.jpg`,
    id: 0,
    links: [
      {
        href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        format: `webm`,
      },
      {
        href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv`,
        format: `ogv`,
      },
    ],
    genre: `Adventure`,
  }],
};


it(`App correctly renders MainPage without user logon`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(
      <MockBrowserRouter>
        <App
          {...mock}
          isAuthorizationRequired={false}
          setGenre={mockFunction}
          tryLogin={mockFunction}
          checkUser={mockFunction}
          errorMessage={``}
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
          {...mock}
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
