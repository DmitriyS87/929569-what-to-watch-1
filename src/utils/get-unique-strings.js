export const getUniqueStrings = (array) => {
  return [...(new Set(array)).entries()].map((it) => it[0]);
};
