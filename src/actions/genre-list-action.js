const changeGenre = (genre) => {
  return {
    type: `GENRE_CHANGE`,
    genre,
  };
};

export {changeGenre};
