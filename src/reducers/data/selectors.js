import {getVideoFormat} from '../../utils/get-video-format';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

const parseMovieData = (movie) => {
  return {
    title: movie.name,
    poster: {
      src: movie[`poster_image`],
      alt: movie.name,
    },
    previewImg: {
      src: movie[`preview_image`],
      alt: movie.name,
    },
    id: movie.id,
    previewMovie: [
      {
        href: movie[`preview_video_link`],
        format: getVideoFormat(movie[`preview_video_link`]),
      },
    ],
    genre: movie.genre,
    director: movie.director,
    description: movie.description,
    releseYear: movie.released,
    runTime: movie[`run_time`],
    rating: movie.rating,
    isFavorite: movie[`is_favorite`],
    scoresCount: movie[`scores_count`],
    starring: movie.starring,
    fullMovie: {
      href: movie[`video_link`],
      format: getVideoFormat(movie[`video_link`]),
    },
    backgroundColor: movie[`background_color`],
    backgroundImg: movie[`background_image`],
  };
};

const transformMoviesToAppFormat = (data) => {
  return data.map((movie) => {
    return parseMovieData(movie);
  });
};

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getUserMovies = (state) => {
  return state[NAME_SPACE].userMovies;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getAdaptedPromoMovie = (state) => {
  const serverFormatPromo = getPromoMovie(state);
  return parseMovieData(serverFormatPromo);
};

export const getAdaptedMovies = (state) => {
  const serverFormatMovies = getMovies(state);
  return transformMoviesToAppFormat(serverFormatMovies);
};

export const getAdaptedUserMovies = (state) => {
  const serverFormatUserMovies = getUserMovies(state);
  return transformMoviesToAppFormat(serverFormatUserMovies);
};

export const getMovie = (state, id) => {
  const movie = state[NAME_SPACE].movies.find((it) => it.id === id);
  if (movie) {
    return parseMovieData(movie);
  }
  return {};
};

export const getMoviesShowLimit = (state) => {
  return state[NAME_SPACE].moviesShowLimit;
};

export const getMovieComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getLoadingStatus = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getIsCommentsLoaded = (state) => {
  return state[NAME_SPACE].isCommentsLoaded;
};
