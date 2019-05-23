import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from '../video-player/video-payer.jsx';
import VIDEO_PLAYER_MOCK from '../../mocks/test-mocks.js';

const mocks = VIDEO_PLAYER_MOCK.film;

it(`VideoPlayer correctly renders after relunch`, () => {
  const tree = renderer
  .create(<VideoPlayer
    poster={mocks.coverSrc}
    movies={mocks.links}
    title={mocks.title}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
