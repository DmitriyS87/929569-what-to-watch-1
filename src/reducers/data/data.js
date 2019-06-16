const initialState = {
  movies: [],
  moviesShowLimit: 20
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  SET_MOVIES_SHOW_LIMIT: `SET_MOVIES_SHOW_LIMIT`
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      movies
    };
  },
  setMoviesShowLimit: (value) => {
    return {
      type: ActionType.SET_MOVIES_SHOW_LIMIT,
      moviesShowLimit: value
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
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.movies});
    case ActionType.SET_MOVIES_SHOW_LIMIT:
      return Object.assign({}, state, {moviesShowLimit: state.moviesShowLimit + action.moviesShowLimit});
    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, ActionType};
