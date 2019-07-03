export enum Tab {
  OWERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews',
}

export interface Movie {
  title: string;
  poster: {
    src: string;
    alt: string;
  };
  previewImg: {
    src: string;
    alt: string;
  };
  id: number;
  previewMovie: {
    href: string;
    format: string;
  }[];
  genre: string;
  director: string;
  description: string;
  releseYear: number;
  runTime: number;
  rating: number;
  isFavorite: boolean;
  scoresCount: number;
  starring: string[];
  fullMovie: {
    href: string;
    format: string;
  };
  backgroundColor: string;
  backgroundImg: { src: string; alt: string };
}

export interface Review {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

interface RootState {
  movies: Movie[];
}

interface RootState {
  isAuthorizationRequired: boolean;
  user: null | {};
  errorMessage: string;
}

interface RootState {
  genre: string;
}

export { RootState };
