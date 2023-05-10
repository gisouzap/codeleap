import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as selectors from '../../../actions/selectors';

import Root from '../index';

describe('Root', () => {
  const originalIsLoggedIn = selectors.selectIsLoggedIn;

  const store = configureStore()({
    user: {
      login: { isLoggedIn: true },
      saveUsername: { username: 'codeLeapUser' },
    },
    posts: {
      loadPosts: {
        items: [],
      },
    },
  });

  afterEach(() => {
    selectors.selectIsLoggedIn = originalIsLoggedIn;

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    selectors.selectIsLoggedIn = jest.fn(() => true);

    render(
      <Provider store={store}>
        <Root />
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
