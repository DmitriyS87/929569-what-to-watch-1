const defaultGenre = `All genres`;
import { Movie } from '../types';

export const getFiltredMovies = (genre: string, movies: Movie[]) => {
  if (defaultGenre === genre) {
    return [...movies];
  }
  return [...movies.filter((film) => film.genre === genre)];
};
