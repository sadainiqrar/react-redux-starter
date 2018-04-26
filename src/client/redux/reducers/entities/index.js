import { combineReducers } from 'redux';
import { books } from './books';
// import { users } from './user'

export const entities = combineReducers({
  books,
});
