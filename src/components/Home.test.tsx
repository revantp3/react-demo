import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import { fetchArticles } from '../features/states/slice';
import { rootReducer } from '../services/store';

jest.mock('../features/states/slice', () => ({
  ...jest.requireActual('../features/states/slice'),
  fetchArticles: jest.fn(() => async (dispatch:any) => {}),
}));

const initialState = {
  articles: {
    filteredAndSortedArticles: [],
    status: 'idle',
  },
};

const mockStore = configureStore({
  reducer: rootReducer,
});

const renderComponent = (store:any) => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

test('renders Home component and collapsible elements', () => {
  renderComponent(mockStore);

  expect(screen.getByText('Articles')).toBeInTheDocument();

  const filterButton = screen.getByLabelText(/filters/i);
  const sortButton = screen.getByLabelText(/sort controls/i);

  fireEvent.click(filterButton);
  expect(screen.getByText(/filters/i)).toBeInTheDocument();

  fireEvent.click(sortButton);
  expect(screen.getByText(/sort controls/i)).toBeInTheDocument();
});

test('shows loader when articles are loading', async () => {
  const loadingState = {
    articles: {
      filteredAndSortedArticles: [],
      status: 'loading',
    },
  };

  const loadingStore = configureStore({
    reducer: rootReducer,
  });

  renderComponent(loadingStore);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('shows no articles message when there are no articles', async () => {
  const noArticlesState = {
    articles: {
      filteredAndSortedArticles: [],
      status: 'succeeded',
    },
  };

  const noArticlesStore = configureStore({
    reducer: rootReducer,
  });

  renderComponent(noArticlesStore);

  expect(screen.getByText(/no articles found/i)).toBeInTheDocument();
});

test('fetchArticles is called on component mount', async () => {
  renderComponent(mockStore);

  await waitFor(() => {
    expect(fetchArticles).toHaveBeenCalled();
  });
});
