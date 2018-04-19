import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';




export default function paginateReducer(state = initialState.books, action) {
  switch(action.type) {
    case types.PAGINATE_BOOK_SUCCESS:
	{
     return action.paginatedBooks
	}
    default: 
      return state;
  }
}