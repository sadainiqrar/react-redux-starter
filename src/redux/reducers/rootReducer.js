import {combineReducers} from 'redux';

import books from './bookReducer';


const rootReducer = combineReducers({
  // short hand property names
  books
})

export default rootReducer;