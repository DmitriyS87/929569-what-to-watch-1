import * as React from 'react';

interface PropsActive {
  activeItem: string,
}

interface PropsNav {
  navItems: string[],
  setActive: (param: string) => void,
}

interface PropsMovie {
  movie: {
    backgroundImg: { src: string, alt: string },
    title: string,
    releseYear: number,
    genre: string,
    poster: { src: string, alt: string },
    director: string,
    starring: string[],
    runTime: string,
  },
}

const MoviePageTab = (props: PropsMovie & PropsNav & PropsActive) => {
  const { navItems, activeItem, setActive, movie } = props;

  const handleClick = (evt) => {
    evt.preventDefault();
    setActive(evt.target.textContent);
  }

  const ScreenTab = (props: PropsMovie & PropsActive) => {
    const { backgroundImg, title, genre, releseYear, poster, director, starring, runTime, } = props.movie
    switch (props.activeItem) {
      case `Overview`:
        return (
          <React.Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">8,9</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">Very good</span>
                <span className="movie-rating__count">240 ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.</p>
              <p>Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>
              <p className="movie-card__director"><strong>Director: Wes Andreson</strong></p>
              <p className="movie-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
            </div>
          </React.Fragment>
        );

      case `Details`:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {starring.map((artist, idx, array) => {
                    if (idx === array.length - 1) {
                      return `${artist}`;
                    }
                    return (
                      <React.Fragment key={`artist${artist}${idx}`}>
                        {`${artist}`} <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </p>

            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{runTime}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{releseYear}</span>
              </p>
            </div>
          </div>
        );
      case `Reviews`:
        return (
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.</p>

                  <footer className="review__details">
                    <cite className="review__author">Kate Muir</cite>
                    <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">8,9</div>
              </div>

              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                  <footer className="review__details">
                    <cite className="review__author">Bill Goodykoontz</cite>
                    <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                  </footer>
                </blockquote>

                <div className="review__rating">8,0</div>
              </div>

              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.</p>

                  <footer className="review__details">
                    <cite className="review__author">Amanda Greever</cite>
                    <time className="review__date" dateTime="2015-11-18" >November 18, 2015</time>
                  </footer>
                </blockquote>

                <div className="review__rating">8,0</div>
              </div>
            </div>
            <div className="movie-card__reviews-col">
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                  <footer className="review__details">
                    <cite className="review__author">Matthew Lickona</cite>
                    <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">7,2</div>
              </div>

              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                  <footer className="review__details">
                    <cite className="review__author">Paula Fleri-Soler</cite>
                    <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">7,6</div>
              </div>

              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                  <footer className="review__details">
                    <cite className="review__author">Paula Fleri-Soler</cite>
                    <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">7,0</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div></div>;
    }
  }

  return (
    <React.Fragment>
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {
              navItems.map((it, idx) => {
                return (
                  <li key={`MNL-${it}-${idx}`} className={`movie-nav__item ${it === activeItem ? `movie-nav__item--active` : ``}`}>
                    <a href="#" onClick={handleClick} className="movie-nav__link">{it}</a>
                  </li>);
              })
            }
          </ul>
        </nav>

        <ScreenTab movie={movie} activeItem={activeItem} />
      </div>
    </React.Fragment>
  );
}

export default MoviePageTab;
