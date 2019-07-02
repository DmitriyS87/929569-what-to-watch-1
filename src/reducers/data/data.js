const initialPromoMovie = {
  title: ``,
  poster: {
    src: ``,
    alt: ``,
  },
  previewImg: {
    src: ``,
    alt: ``,
  },
  id: 0,
  previewMovie: [],
  genre: ``,
  director: ``,
  description: ``,
  releseYear: 0,
  runTime: ``,
  rating: 0,
  isFavorite: false,
  scoresCount: 0,
  starring: [],
  fullMovie: {
    href: ``,
  },
  backgroundColor: ``,
  backgroundImg: {src: ``, alt: ``},
};

const initialState = {
  movies: [],
  moviesShowLimit: 20,
  promoMovie: initialPromoMovie,
  errorMessage: ``,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_MOVIES_SHOW_LIMIT: `SET_MOVIES_SHOW_LIMIT`,
  TOGGLE_IS_FAVORITE: `TOGGLE_IS_FAVORITE`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      movies,
    };
  },
  loadPromoMovie: (promoMovie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      promoMovie,
    };
  },
  setMoviesShowLimit: (value) => {
    return {
      type: ActionType.SET_MOVIES_SHOW_LIMIT,
      moviesShowLimit: value,
    };
  },
  toggleMovieFavorite: (value) => {
    return {
      type: ActionType.TOGGLE_IS_FAVORITE,
      value,
    };
  },
  setErrorMessage: (responseError) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      responseError,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
    });
  },
  getPromoMovie: () => (dispatch, _getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      dispatch(ActionCreator.loadPromoMovie(response.data));
    });
  },
  setFavoriteMovie: (subPath) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${subPath}`)
      .then((response) => {
        dispatch(ActionCreator.toggleMovieFavorite(response.data));
      })
      .catch((err) => ActionCreator.setErrorMessage(err.response));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.movies});
    case ActionType.LOAD_PROMO_MOVIE:
      return Object.assign({}, state, {promoMovie: action.promoMovie});
    case ActionType.TOGGLE_IS_FAVORITE:
      const movies = [...state.movies];
      movies.find((it) => it.id === action.value.id)[`is_favorite`] = action.value[`is_favorite`];
      return Object.assign({}, state, {movies});
    case ActionType.SET_MOVIES_SHOW_LIMIT:
      return Object.assign({}, state, {
        moviesShowLimit: state.moviesShowLimit + action.moviesShowLimit,
      });
    case ActionType.SET_ERROR_MESSAGE:
      return Object.assign({}, state, {
        errorMessage: `Error data loading. Status: ${action.responseError.status}. ${
          action.responseError.statusText
        }`,
      });
    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, ActionType};
