export const getMovieLengthFormat = (lengthMinets: number) => {
  const hours: number = Math.floor(lengthMinets / 60);
  const minets: number = lengthMinets - hours * 60;
  return hours !== 0 ? `${hours}h ${minets}m` : `    ${minets}m`;
};
