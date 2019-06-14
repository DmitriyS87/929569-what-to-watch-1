export interface Movies {
  title: string,
  coverSrc: string,
  id: number,
  links: {
    href: string,
    format: string,
  }[],
  genre: string,
}

export interface Movie {
  title: string,
  coverSrc: string,
  id: number,
  links: {
    href: string,
    format: string,
  }[],
  genre: string,
}

interface RootState {
  movies: Movies[],
}

interface RootState {
  isAuthorizationRequired: boolean,
  user: null | {},
  errorMessage: string,
}

interface RootState {
  genre: string,
}

export { RootState };
