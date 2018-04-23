import * as types from './actionTypes';
import bookApi from '../../api/bookApi';

export function loadBooksSuccess(books) {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}
export function loadBookSuccess(book) {
  return { type: types.LOAD_BOOK_SUCCESS, book };
}

export function loadBooks(data) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return dispatch => {
    bookApi
      .getAllBooks(data)
      .then(books => {
        dispatch(loadBooksSuccess(books));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function loadBook(data) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return dispatch => {
    bookApi
      .getBook(data)
      .then(book => {
        dispatch(loadBookSuccess(book));
      })
      .catch(error => {
        throw error;
      });
  };
}
