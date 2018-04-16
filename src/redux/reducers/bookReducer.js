import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function bookReducer(state = initialState.books, action) {
  switch(action.type) {
    case types.LOAD_BOOKS_SUCCESS:
     return action.books
	case types.CANCEL_REQUEST:
	 return state
    default: 
      return state;
  }
}