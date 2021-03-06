import { excludeItemById } from './exclude-item-by-id';
import { getLimitedItems } from './get-limited-items';
import { getFiltredMovies } from './get-filtred-movies';
import { getVideoFormat } from './get-video-format';

import testMock from '../mocks/test-mocks.js';

const mockItems = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

it(`excludeItemById correctly deletes first element`, function () {
  const result = excludeItemById(1, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 1 }]);
});

it(`excludeItemById correctly deletes middle element`, function () {
  const result = excludeItemById(3, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 3 }]);
});

it(`excludeItemById correctly deletes last element`, function () {
  const result = excludeItemById(6, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 6 }]);
});

it(`getLimitedItems correctly return result with empty array`, function () {
  const mockItemsZero = [];
  const result = getLimitedItems(6, mockItemsZero);
  expect(result).toHaveLength(0);
  expect(result).toStrictEqual([]);
});

it(`getLimitedItems correctly return result with limit > items.length`, function () {
  const result = getLimitedItems(10, mockItems);
  expect(result).toHaveLength(6);
  expect(result).toBe(mockItems);
});

it(`getLimitedItems correctly return result with limit = items.length`, function () {
  const result = getLimitedItems(6, mockItems);
  expect(result).toHaveLength(6);
  expect(result).toBe(mockItems);
});

it(`getLimitedItems correctly return result with limit < items.length`, function () {
  const result = getLimitedItems(3, mockItems);

  expect(result).toHaveLength(3);
});

it(`getFiltredMovies correctly return all movies with genre:defaultGenre param`, function () {
  const result = getFiltredMovies(`All genres`, testMock.films);
  expect(result).toHaveLength(3);
});

it(`getFiltredMovies correctly return 2 movies with genre:\'Adventure\' param`, function () {
  const result = getFiltredMovies(`Adventure`, testMock.films);
  expect(result).toHaveLength(2);
});

it(`getVideoFormat correctly return fromat mp4 from src`, function () {
  const mockSrcMovies = [
    "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    "https://download.blender.org.org.ru.com.mp4/durian/trailer/sintel_trailer-480p.org.ru.com.mp4",
  ];
  mockSrcMovies.forEach((src) => {
    const result = getVideoFormat(src);
    expect(result).toBe('mp4');
  })

});

it(`getVideoFormat correctly return fromat webm from src`, function () {
  const mockSrcMovies = [
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm",
    "http://media.xiph.org/mango/tears_of_steel_1080p.webm",
  ];
  mockSrcMovies.forEach((src) => {
    const result = getVideoFormat(src);
    expect(result).toEqual('webm');
  })
});

