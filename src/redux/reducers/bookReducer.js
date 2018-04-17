import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';




export default function bookReducer(state = initialState.book, action) {
  switch(action.type) {
	 
    case types.LOAD_BOOK_SUCCESS:
	{
     return action.book
	}
	case types.CANCEL_REQUEST:
	 return state
    default: 
      return state;
  }
}