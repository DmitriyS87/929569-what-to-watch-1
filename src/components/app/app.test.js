import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app.jsx';

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
    .create(<App
      {...mock}
      isAuthorizationRequired={false}
      setGenre={mockFunction}
      tryLogin={mockFunction}
      checkUser={mockFunction}
      errorMessage={``}
      user={null}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders MainPage with user logon`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(<App
      {...mock}
      isAuthorizationRequired={false}
      setGenre={mockFunction}
      tryLogin={mockFunction}
      checkUser={mockFunction}
      errorMessage={``}
      user={{id: `mock`}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
