import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.GENRE;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};
