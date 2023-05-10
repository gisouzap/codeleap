import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
  },

  reducers: {
    saveUsername: (state, action) => {
      state.username = action.payload;
    },
    login: state => {
      console.log(state);
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.username = '';
    },
  },
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {},

  reducers: {
    loadPosts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { saveUsername, login, logout } = userSlice.actions;
export const { loadPosts, requestPosts } = postsSlice.actions;

export const { reducer: usersReducer } = userSlice;
export const { reducer: postsReducer } = postsSlice;
