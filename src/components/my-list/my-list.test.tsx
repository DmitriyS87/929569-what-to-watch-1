import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MyList } from './my-list';
import mockData from '../../mocks/test-mocks.js';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as reactRouter from 'react-router-dom';

const { MemoryRouter } = reactRouter;
const MockBrowserRouter = ({ children }) => (
  <MemoryRouter initialEntries={[`/`]}>{children}</MemoryRouter>
);

const mockStore = configureStore();
const getState = {
  USER: {
    user: {},
  },
};

const store = mockStore(getState);

it(`MyList correctly renders after relunch: `, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockBrowserRouter>
          <MyList userMovies={mockData.films} />
        </MockBrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
