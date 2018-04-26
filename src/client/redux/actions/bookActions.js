import * as types from './actionTypes';
import bookApi from '../../api/bookApi';

export function PaginateBooksSuccess(books) {
  return { type: types.PAGINATE_BOOKS_SUCCESS, books };
}

export function loadBooks(data) {
  // make async call to api, handle promise, dispatch action when promise is resolved

  return dispatch => {
    dispatch({
      type: types.LOAD_BOOKS,
    });

    bookApi
      .getAllBooks(data)
      .then(books => {
        dispatch({
          type: types.LOAD_BOOKS_SUCCESS,
          payload: books,
          intent: 'NEW',
        });
      })
      .catch(error => {
        dispatch({
          type: types.LOAD_BOOKS_FAILURE,
          payload: error,
        });
      });
  };
}

export function PaginateBooks(data) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return dispatch => {
    dispatch({
      type: types.LOAD_BOOKS,
    });

    bookApi
      .getAllBooks(data)
      .then(books => {
        dispatch({
          type: types.LOAD_BOOKS_SUCCESS,
          payload: books,
          intent: 'PAGINATE',
        });
      })
      .catch(error => {
        dispatch({
          type: types.LOAD_BOOKS_FAILURE,
          payload: error,
        });
      });
  };
}
