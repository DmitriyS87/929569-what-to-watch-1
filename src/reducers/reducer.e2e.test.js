import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {reducer} from '../reducers/reducer';
import {GENRE_LIST_ACTION} from '../constants/genre-list-action.constant';
import TEST_MOCKS from '../mocks/test-mocks.js';

Enzyme.configure({adapter: new Adapter()});

it(`reducer correctly update state by changeGenre`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: TEST_MOCKS.films,
    genres: TEST_MOCKS.genres,
  }, {
    type: GENRE_LIST_ACTION.GENRE_CHANGE,
    genre: `Adventure`
  })).toEqual({
    genre: `Adventure`,
    movies: [{
      title: `Aviator`,
      coverSrc: `img/aviator.jpg`,
      id: 0,
      links: [
        {
          herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          herf: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          format: `mp4`,
        },
      ],
      genre: `Adventure`,
    }],
    genres: TEST_MOCKS.genres,
  });
});
