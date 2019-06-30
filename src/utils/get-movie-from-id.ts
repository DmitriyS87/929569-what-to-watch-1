export const getMovie = (movies, id) => {
  const movie = movies.find((it) => it.id === id);
  if (movie) {
    return movie;
  }
  return {};
};
