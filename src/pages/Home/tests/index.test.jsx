import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';

import * as selectors from '../../../actions/selectors';

import Home from '../index';

describe('Home', () => {
  const originalPosts = selectors.selectPosts;
  const originalUsername = selectors.selectUsername;

  jest.spyOn(axios, 'get').mockResolvedValue({});

  // silences errors in the terminal because of tests that throw errors
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const posts = {
    results: [
      {
        id: 1,
        username: 'codeLeapUser',
        title: '',
        content: '',
        created_datetime: '"2023-05-09T15:42:38.421Z"',
      },
      {
        id: 2,
        username: 'XPTO',
        title: 'Yey',
        content: 'Hello test',
        created_datetime: '"2023-05-09T15:42:38.421Z"',
      },
    ],
  };

  const username = 'codeLeapUser';

  jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
  }));

  const store = configureStore()({
    user: {
      login: { isLoggedIn: true },
      saveUsername: { username: 'codeLeapUser' },
    },
    posts: {
      loadPosts: {
        items: posts,
      },
    },
  });

  afterEach(() => {
    selectors.selectPosts = originalPosts;
    selectors.selectUsername = originalUsername;

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should trigger click on logout button', () => {
    const spy = jest.spyOn(global.console, 'error');

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const logoutBtn = getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should test the catch if GET is failed', () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({})
      .mockRejectedValue(new Error('Error GET'));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it('should create a new post with title and content', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({});

    const { getAllByRole, getByText, container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const input = getAllByRole('textbox')[0];
    fireEvent.change(input, { target: { value: 'New title' } });

    const textarea = getAllByRole('textbox')[1];
    fireEvent.change(textarea, { target: { value: 'LoL' } });

    const createBtn = getByText('create');

    await act(async () => {
      fireEvent.click(createBtn);
    });
  });

  it('should throw error and show toast error message', async () => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValue({})
      .mockRejectedValue(new Error('Error POST'));

    const { getAllByRole, getByText, container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const input = getAllByRole('textbox')[0];
    fireEvent.change(input, { target: { value: 'New title' } });

    const textarea = getAllByRole('textbox')[1];
    fireEvent.change(textarea, { target: { value: 'LoL' } });

    const createBtn = getByText('create');

    await act(async () => {
      fireEvent.click(createBtn);
    });
  });

  it('should edit an existing post', async () => {
    jest.spyOn(axios, 'patch').mockResolvedValue({});

    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getAllByRole, getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const editBtn = getByTitle('Edit');
    fireEvent.click(editBtn);

    const input = getAllByRole('textbox')[2];
    fireEvent.change(input, { target: { value: 'Edited title' } });

    const textarea = getAllByRole('textbox')[3];
    fireEvent.change(textarea, { target: { value: ':)' } });

    const createBtn = getByText('Save');

    await waitFor(() => {
      fireEvent.click(createBtn);
    });
  });

  it('should throw error when try to edit an existing post', async () => {
    jest.spyOn(axios, 'patch').mockResolvedValue({});

    jest
      .spyOn(axios, 'patch')
      .mockResolvedValue({})
      .mockRejectedValue(new Error('Error PATCH'));

    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getAllByRole, getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const editBtn = getByTitle('Edit');
    fireEvent.click(editBtn);

    const input = getAllByRole('textbox')[2];
    fireEvent.change(input, { target: { value: 'Edited title' } });

    const textarea = getAllByRole('textbox')[3];
    fireEvent.change(textarea, { target: { value: ':)' } });

    const createBtn = getByText('Save');

    await waitFor(() => {
      fireEvent.click(createBtn);
    });
  });

  it('should delete an existing post', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValue({});

    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const deleteBtn = getByTitle('Delete');
    fireEvent.click(deleteBtn);

    const confirmBtn = getByText('Delete');

    await waitFor(() => {
      fireEvent.click(confirmBtn);
    });
  });

  it('should throw error when try to delete an existing post', async () => {
    jest
      .spyOn(axios, 'delete')
      .mockResolvedValue({})
      .mockRejectedValue(new Error('Error DELETE'));

    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const deleteBtn = getByTitle('Delete');
    fireEvent.click(deleteBtn);

    const confirmBtn = getByText('Delete');

    await waitFor(() => {
      fireEvent.click(confirmBtn);
    });
  });

  it('should load more posts on scroll', async () => {
    const nextPage = 'https://dev.codeleap.co.uk/careers/next-page/';

    axios.get.mockResolvedValue({
      data: {
        results: [],
        next: nextPage,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const postsDiv = getByTestId('scroll-element');
    Object.defineProperty(postsDiv, 'scrollHeight', { value: 100 });
    Object.defineProperty(postsDiv, 'scrollTop', { value: 50 });
    Object.defineProperty(postsDiv, 'clientHeight', { value: 50 });

    fireEvent.scroll(postsDiv);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  it('should throw error when try to load more posts on scroll', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({})
      .mockRejectedValue(new Error('Error GET'));

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const postsDiv = getByTestId('scroll-element');
    Object.defineProperty(postsDiv, 'scrollHeight', { value: 100 });
    Object.defineProperty(postsDiv, 'scrollTop', { value: 50 });
    Object.defineProperty(postsDiv, 'clientHeight', { value: 50 });

    fireEvent.scroll(postsDiv);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  it('should scroll posts and not call the request if it is not at the bottom', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const postsDiv = getByTestId('scroll-element');
    Object.defineProperty(postsDiv, 'scrollHeight', { value: 100 });
    Object.defineProperty(postsDiv, 'scrollTop', { value: 20 });
    Object.defineProperty(postsDiv, 'clientHeight', { value: 50 });

    fireEvent.scroll(postsDiv);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('should open the edit modal and close it', async () => {
    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const editBtn = getByTitle('Edit');
    fireEvent.click(editBtn);

    const editTitle = getByText('Edit item');
    expect(editTitle).toBeInTheDocument();

    const cancelBtn = getByText('Cancel');

    fireEvent.click(cancelBtn);

    expect(editTitle).not.toBeInTheDocument();
  });

  it('should open the delete modal and close it', async () => {
    selectors.selectPosts = jest.fn(() => posts);
    selectors.selectUsername = jest.fn(() => username);

    const { getByText, getByTitle } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const editBtn = getByTitle('Delete');
    fireEvent.click(editBtn);

    const deleteTitle = getByText('Are you sure you want to delete this item?');
    expect(deleteTitle).toBeInTheDocument();

    const cancelBtn = getByText('Cancel');
    fireEvent.click(cancelBtn);

    expect(deleteTitle).not.toBeInTheDocument();
  });

  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
