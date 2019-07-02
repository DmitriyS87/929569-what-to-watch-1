import configureStore from 'redux-mock-store';

export const getMockStore = (initialState: Object) => {
  const mockStore = configureStore();
  const getState = initialState;
  return mockStore(initialState);
};
