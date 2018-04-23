import { combineReducers } from 'redux';
import book from './bookReducer';
import books from './booksReducer';

const rootReducer = combineReducers({
  // short hand property names
  books,
  book,
});

export default rootReducer;
