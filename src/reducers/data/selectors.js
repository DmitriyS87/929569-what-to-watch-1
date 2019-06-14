import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getAdaptedMovies = (state) => {
  const serverFormatMovies = getMovies(state);
  const transformToAppData = (data) => {
    return data.map((movie) => {
      return {
        title: movie.name,
        poster: {
          src: movie[`poster_image`],
          alt: ``
        },
        previewImg: {
          src: movie[`preview_image`],
          alt: ``
        },
        id: movie.id,
        previewMovie: [{
          href: movie[`preview_video_link`],
          format: `mp4`
        }],
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
        },
        backgroundColor: movie[`background_color`],
        backgroundImg: movie[`background_image`],
      };
    });
  };

  return transformToAppData(serverFormatMovies);
};

export const getMovie = (state, id) => {
  const movie = state[NAME_SPACE].movies.find((it) => it.id === id);
  if (movie) {
    return movie;
  }
  return {};
};
