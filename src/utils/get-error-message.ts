export const getErrorMessage = (response: Response) => {
  switch (response.status) {
    case 400:
      return `We can’t recognize this email and password combination. Please try again.`;
    case 430:
      return `403 Access forbidden. Please login. This page redirects to login automatically...`;
    default:
      return `Непредвиденная ошибка: ${response.status} details: ${response.statusText}`;
  }
};
