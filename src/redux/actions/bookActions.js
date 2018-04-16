import * as types from './actionTypes';
import bookApi from '../../api/bookApi';

export function loadBooksSuccess(books) {
  return {type: types.LOAD_BOOKS_SUCCESS, books};
}



export function loadBooks(data) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return bookApi.getAllBooks(data).then(books => {
      dispatch(loadBooksSuccess(books));
    }).catch(error => {
      throw(error);
    });
  };
}
