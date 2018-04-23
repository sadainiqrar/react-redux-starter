import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function booksReducer(state = initialState.books, action) {
  switch (action.type) {
    case types.LOAD_BOOKS_SUCCESS:
      return action.books;
    default:
      return state;
  }
}
