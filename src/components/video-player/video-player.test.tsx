import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayer from './video-player';
import mockData from '../../mocks/test-mocks.js';

it(`VideoPlayer correctly renders after relunch`, () => {
  const mockFunction = jest.fn();
  const tree = renderer
    .create(<VideoPlayer
      poster={mockData.film.previewImg.src}
      movies={mockData.film.previewMovie}
      title={mockData.film.title}
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
