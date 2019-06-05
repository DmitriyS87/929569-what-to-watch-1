const initialState = {
  genre: `All genres`,
};

const ActionType = {
  GENRE_CHANGE: `GENRE_CHANGE`,
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.GENRE_CHANGE,
      genre,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GENRE_CHANGE:
      return Object.assign({}, state, {genre: action.genre});
    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
