export const getLimitedItems = (limit: number, items: any[]) => {
  if (limit >= items.length) {
    return items;
  }
  return items.splice(0, limit);
};
