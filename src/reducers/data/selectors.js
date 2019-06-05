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
        coverSrc: movie[`preview_image`],
        id: movie.id,
        links: [{
          href: movie[`preview_video_link`],
          format: `mp4`
        }],
        genre: movie.genre,
      };
    });
  };

  return transformToAppData(serverFormatMovies);
};
