import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Signup from '../index';

describe('Signup', () => {
  const store = configureStore()({});

  afterAll(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should fill the input and trigger click on Enter button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'user' } });

    const btn = getByRole('button');
    fireEvent.click(btn);
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
