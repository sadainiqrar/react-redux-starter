import { combineReducers } from 'redux';
import { searchResults } from './searchResults';

export const lists = combineReducers({
  searchResults,
});
