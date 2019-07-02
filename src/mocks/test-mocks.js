export default {
  films: [
    {
      title: `Aviator`,
      poster: {
        src: `img/aviator_poster.jpg`,
        alt: ``,
      },
      previewImg: {
        src: `img/aviator.jpg`,
        alt: `Aviator`,
      },
      id: 0,
      previewMovie: [
        {
          href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          format: `mp4`,
        },
      ],
      genre: `Adventure`,
      director: `Test person`,
      description: `Test text about current movie`,
      releseYear: `1917`,
      runTime: `string?`,
      rating: 15,
      isFavorite: false,
      scoresCount: 542,
      starring: [`Best Artist`, `Best Acter`, `Best Person`],
      fullMovie: {
        href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
      backgroundColor: `#ffffff`,
      backgroundImg: {
        src: `img/aviator.jpg`,
        alt: `Aviator`,
      },
    },
    {
      title: `Pulp Fiction`,
      poster: {
        src: `img/pulp-fiction.jpg`,
        alt: ``,
      },
      previewImg: {
        src: `img/pulp-fiction.jpg`,
        alt: `Pulp Fiction`,
      },
      id: 1,
      previewMovie: [
        {
          href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          format: `mp4`,
        },
      ],
      genre: `Western`,
      director: `Test person`,
      description: `Test text about current movie Pulp Fiction`,
      releseYear: `1905`,
      runTime: `string?`,
      rating: 100,
      isFavorite: true,
      scoresCount: 777,
      starring: [
        `The Best of the Best Artist`,
        `The Best of the Best Acter`,
        `The Best of the Best Person`,
      ],
      fullMovie: {
        href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
      backgroundColor: `#e90909`,
      backgroundImg: {
        src: `img/pulp-fiction.jpg`,
        alt: `Pulp Fiction`,
      },
    },
    {
      title: `Aviator CLONE`,
      poster: {
        src: `img/aviator_poster.jpg`,
        alt: ``,
      },
      previewImg: {
        src: `img/aviator.jpg`,
        alt: `Aviator`,
      },
      id: 2,
      previewMovie: [
        {
          href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          format: `mp4`,
        },
      ],
      genre: `Adventure`,
      director: `Test person`,
      description: `Test text about current movie`,
      releseYear: `1917`,
      runTime: `string?`,
      rating: 15,
      isFavorite: false,
      scoresCount: 542,
      starring: [`Best Artist`, `Best Acter`, `Best Person`],
      fullMovie: {
        href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
      backgroundColor: `#ffffff`,
      backgroundImg: {
        src: `img/aviator.jpg`,
        alt: `Aviator`,
      },
    },
  ],
  film: {
    title: `Aviator`,
    poster: {
      src: `img/aviator_poster.jpg`,
      alt: ``,
    },
    previewImg: {
      src: `img/aviator.jpg`,
      alt: `Aviator`,
    },
    id: 0,
    previewMovie: [
      {
        href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        format: `webm`,
      },
      {
        href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        format: `mp4`,
      },
    ],
    genre: `Adventure`,
    director: `Test person`,
    description: `Test text about current movie. Next row test text about current movie. Last row test text about current movie.`,
    releseYear: `1917`,
    runTime: `string`,
    rating: 15,
    isFavorite: false,
    scoresCount: 542,
    starring: [`Best Artist`, `Best Acter`, `Best Person`],
    fullMovie: {
      href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    },
    backgroundColor: `#ffffff`,
    backgroundImg: {
      src: `img/aviator.jpg`,
      alt: `Aviator`,
    },
  },
  activeGenre: `All genres`,
  genres: [`All genres`, `Adventure`, `Western`],
  mapStateToProps: {
    active: `All genres`,
    movies: [
      {
        title: `Aviator`,
        poster: {
          src: `img/aviator_poster.jpg`,
          alt: ``,
        },
        previewImg: {
          src: `img/aviator.jpg`,
          alt: `Aviator`,
        },
        id: 0,
        previewMovie: [
          {
            href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
            format: `webm`,
          },
          {
            href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
            format: `mp4`,
          },
        ],
        genre: `Adventure`,
        director: `Test person`,
        description: `Test text about current movie`,
        releseYear: `1917`,
        runTime: `string`,
        rating: 15,
        isFavorite: false,
        scoresCount: 542,
        starring: [`Best Artist`, `Best Acter`, `Best Person`],
        fullMovie: {
          href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        },
        backgroundColor: `#ffffff`,
        backgroundImg: {
          src: `img/aviator.jpg`,
          alt: `Aviator`,
        },
      },
    ],
    isAuthorizationRequired: false,
  },
};
