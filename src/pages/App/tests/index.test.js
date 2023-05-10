import React from 'react';
import { render } from '@testing-library/react';
import App from '../index';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

describe('App', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    user: { login: { isLoggedIn: true } },
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
