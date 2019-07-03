export const getRandomPositiveCounts = (
  min: number,
  max: number,
  count = max - min + 1
): number[] => {
  if (max < min) {
    const buffer = max;
    max = min;
    min = buffer;
  }

  if (count <= 0 || min < 0 || max < 0) {
    return [];
  }

  const empty = new Array(count);
  const sequence = empty.map((_it, idx) => {
    return idx + Math.round(min);
  });

  return empty.map(() => Math.round(min + Math.random() * (max - min)));
};
