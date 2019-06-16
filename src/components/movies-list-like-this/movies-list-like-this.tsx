import * as React from 'react';

const MoviesListLikeThis = (props) => {
  const { children } = props;
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      {children}
    </section>
  );
}

export default MoviesListLikeThis;
