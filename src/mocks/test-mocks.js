export default {
  films: [{
    title: `Aviator`,
    coverSrc: `img/aviator.jpg`,
    id: 0,
    links: [
      {
        herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        format: `webm`,
      },
      {
        herf: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
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
        herf: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        format: `mp4`,
      },
      {
        herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
        herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        format: `webm`,
      },
      {
        herf: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        format: `mp4`,
      },
    ],
    genre: `Adventure`,
  },
  activeGenre: `All genres`,
  genres: [`All genres`, `Adventure`],
  dispatchToProps: {
    active: `All genres`,
    movies: [{
      title: `Aviator`,
      coverSrc: `img/aviator.jpg`,
      id: 0,
      links: [
        {
          herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          format: `webm`,
        },
        {
          herf: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv`,
          format: `ogv`,
        },
      ],
      genre: `Adventure`,
    }],
    genres: [`All genres`, `Adventure`],
  }
};
