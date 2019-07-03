export const getMessageFromObject = object => {
  return Object.keys(object)
    .map((fieldName, idx) => {
      if (object[fieldName].length > 0) {
        return `${fieldName}: ${object[fieldName]}.`;
      } else {
        return [];
      }
    })
    .join(` `);
};
