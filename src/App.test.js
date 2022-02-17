import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders a title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getAllByText(/cat/)).toBeInTheDocument();
});

test('store is not empty or falsy', () => {
  expect(store).not.toBeNull();
})