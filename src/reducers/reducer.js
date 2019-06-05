const initialState = {
  genre: `All genres`,
  movies: [],
};

const ActionType = {
  GENRE_CHANGE: `GENRE_CHANGE`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  SHOW_ERROR_SCREEN: `SHOW_ERROR_SCREEN`
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      movies
    };
  },
  showErrorScreen: (message = `Error`) => {
    return {
      type: ActionType.SHOW_ERROR_SCREEN,
      message
    };
  },
  changeGenre: (genre) => {
    return {
      type: ActionType.GENRE_CHANGE,
      genre,
    };
  }
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GENRE_CHANGE:
      return Object.assign({}, state, {genre: action.genre});
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.movies});
    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, ActionType};
