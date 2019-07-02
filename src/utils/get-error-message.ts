export const getErrorMessage = err => {
  switch (err.response.status) {
    case 400:
      return `We can’t recognize this email and password combination. Please try again.`;
    case 430:
      return `403 Access forbidden. Please login. This page redirects to login automatically...`;
    default:
      return `Непредвиденная ошибка: ${err.response.status} details: ${err.response.statusText}`;
  }
};
