import { combineReducers } from 'redux';
import { postsReducer, usersReducer } from '../actions';

const rootReducer = combineReducers({
  user: usersReducer,
  posts: postsReducer,
});

export default rootReducer;
