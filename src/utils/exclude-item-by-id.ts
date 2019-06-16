export const excludeItemById = (id: number, items: any[]) => {
  const excludingItem = items.find((it) => it.id === id);
  const excludingItemIndex = items.indexOf(excludingItem);
  if (excludingItemIndex === -1) {
    return items;
  }
  return [...items.slice().splice(0, excludingItemIndex), ...items.slice().splice(excludingItemIndex + 1, items.length - excludingItemIndex)];
};
