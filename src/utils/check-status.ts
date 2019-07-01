export const checkStatusOk = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};
