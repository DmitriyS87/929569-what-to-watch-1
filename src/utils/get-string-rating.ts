const Ratings = [
  {
    name: `Bad`,
    min: 0,
    max: 3,
  },
  {
    name: `Normal`,
    min: 3,
    max: 5,
  },
  {
    name: `Good`,
    min: 5,
    max: 8,
  },
  {
    name: `Very good`,
    min: 8,
    max: 10,
  },
  {
    name: `Awsome`,
    min: 10,
    max: 10,
  },
];

export const getStringRating = (rating: number) => {
  const max = Ratings[Ratings.length - 1].max;
  const min = Ratings[0].min;

  if (rating > max || rating < min) {
    return ``;
  }

  const group = Ratings.find(it => {
    return rating - it.max < 0;
  });

  if (!group) {
    return Ratings[Ratings.length - 1].name;
  }

  return group.name;
};
