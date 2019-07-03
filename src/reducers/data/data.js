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
  userMovies: [],
  comments: null,
  isLoading: false,
  isCommentsLoaded: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_USER_MOVIES: `LOAD_USER_MOVIES`,
  SET_MOVIES_SHOW_LIMIT: `SET_MOVIES_SHOW_LIMIT`,
  TOGGLE_IS_FAVORITE: `TOGGLE_IS_FAVORITE`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  RESET_STATE_MOVIE_COMMENTS: `RESET_STATE_MOVIE_COMMENTS`,
  IS_LOADING_DATA: `IS_LOADING_DATA`,
  IS_COMMENTS_LOADED: `IS_COMMENTS_LOADED`,
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
  loadUserMovies: (userMovies) => {
    return {
      type: ActionType.LOAD_USER_MOVIES,
      userMovies,
    };
  },
  getMovieComments: (value) => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      comments: value,
    };
  },
  resetStateMovieComments: () => {
    return {
      type: ActionType.RESET_STATE_MOVIE_COMMENTS,
      comments: [...initialState.comments],
    };
  },
  setMoviesShowLimit: (value) => {
    return {
      type: ActionType.SET_MOVIES_SHOW_LIMIT,
      moviesShowLimit: value,
    };
  },
  setLoadingStatus: (value) => {
    return {
      type: ActionType.IS_LOADING_DATA,
      status: value,
    };
  },
  toggleMovieFavorite: (value) => {
    return {
      type: ActionType.TOGGLE_IS_FAVORITE,
      value,
    };
  },
  toggleCommentsLoaded: (value) => {
    return {
      type: ActionType.IS_COMMENTS_LOADED,
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
    return api
      .get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      })
      .catch((err) => dispatch(ActionCreator.setErrorMessage(err)));
  },
  loadUserMovies: () => (dispatch, _getState, api) => {
    // dispatch(ActionCreator.setLoadingStatus(true));
    return api
      .get(`/favorite`)
      .then((response) => {
        // dispatch(ActionCreator.setLoadingStatus(false));
        dispatch(ActionCreator.loadUserMovies(response.data));
      })
      .catch((err) => dispatch(ActionCreator.setErrorMessage(err)));
  },
  getPromoMovie: () => (dispatch, _getState, api) => {
    return api
      .get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response.data));
      })
      .catch((err) => dispatch(ActionCreator.setErrorMessage(err)));
  },
  getMovieComments: (id) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));
    return api
      .get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getMovieComments(response.data));
        dispatch(ActionCreator.setLoadingStatus(false));
      })
      .catch((err) => {
        return dispatch(ActionCreator.setErrorMessage(err));
      });
  },
  setFavoriteMovie: (subPath) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.setLoadingStatus(true));
    return api
      .post(`/favorite/${subPath}`)
      .then((response) => {
        dispatch(ActionCreator.setLoadingStatus(false));
        dispatch(ActionCreator.toggleMovieFavorite(response.data));
      })
      .catch((err) => dispatch(ActionCreator.setErrorMessage(err.response)));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.movies});
    case ActionType.LOAD_PROMO_MOVIE:
      return Object.assign({}, state, {promoMovie: action.promoMovie});
    case ActionType.LOAD_USER_MOVIES:
      return Object.assign({}, state, {userMovies: action.userMovies});
    case ActionType.LOAD_MOVIE_COMMENTS:
      return Object.assign({}, state, {comments: action.comments});
    case ActionType.RESET_STATE_MOVIE_COMMENTS:
      return Object.assign({}, state, {comments: action.comments});
    case ActionType.IS_LOADING_DATA:
      return Object.assign({}, state, {isLoading: action.status});
    case ActionType.TOGGLE_IS_FAVORITE:
      const movies = [...state.movies];
      movies.find((it) => it.id === action.value.id)[`is_favorite`] = action.value[`is_favorite`];
      return Object.assign({}, state, {movies});
    case ActionType.SET_MOVIES_SHOW_LIMIT:
      return Object.assign({}, state, {
        moviesShowLimit: state.moviesShowLimit + action.moviesShowLimit,
      });
    case ActionType.SET_ERROR_MESSAGE:
      // console.log(action.responseError);
      return Object.assign({}, state, {
        errorMessage: `Error data loading. Details: ${action.responseError.error}.}`,
      }); // !!! change it!
    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation, ActionType};
