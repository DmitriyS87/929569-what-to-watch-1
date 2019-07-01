export const getAdaptedRouteId = (routeId: string) => {
  return parseInt(routeId.slice(1, routeId.length));
};
