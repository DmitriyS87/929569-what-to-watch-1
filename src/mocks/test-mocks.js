export default {
  films: [{
    title: `Aviator`,
    coverSrc: `img/aviator.jpg`,
    id: 0,
    links: [
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
  },
  {
    title: `Pulp Fiction`,
    coverSrc: `img/pulp-fiction.jpg`,
    id: 1,
    links: [
      {
        href: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        format: `mp4`,
      },
      {
        href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        format: `webm`,
      },
    ],
    genre: `Western`
  }],
  film: {
    title: `Aviator`,
    coverSrc: `img/aviator.jpg`,
    id: 0,
    links: [
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
  },
  activeGenre: `All genres`,
  genres: [`All genres`, `Adventure`, `Western`],
  dispatchToProps: {
    active: `All genres`,
    movies: [{
      title: `Aviator`,
      coverSrc: `img/aviator.jpg`,
      id: 0,
      links: [
        {
          href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          href: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv`,
          format: `ogv`,
        },
      ],
      genre: `Adventure`,
    }],
    genres: [`All genres`, `Adventure`],
  }
};
