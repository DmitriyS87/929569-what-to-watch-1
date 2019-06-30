export const getVideoFormat = (src: string = ``) => {
  const results = src.match(/(\w+)$/igmu);
  return results ? results[0] : null;
};
