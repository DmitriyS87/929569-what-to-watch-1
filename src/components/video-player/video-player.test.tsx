import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayer from './video-player';
import VIDEO_PLAYER_MOCK from '../../mocks/test-mocks.js';

const mocks = VIDEO_PLAYER_MOCK.film;

it(`VideoPlayer correctly renders after relunch`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(<VideoPlayer
      poster={mocks.coverSrc}
      movies={mocks.links}
      title={mocks.title}
      onMouseLeave={mockFunction}
    />, {
        createNodeMock: (element) => {
          if (element.type === `video`) {
            return {
              focused: true,
              autoplay: true,
              controls: true,
              mute: true,
              onMouseLeave: mockFunction,
              onError: mockFunction,
            };
          }
          return null;
        }
      }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
