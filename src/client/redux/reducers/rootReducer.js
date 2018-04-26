import { combineReducers } from 'redux';
import { entities } from './entities';
import { lists } from './lists';

const rootReducer = combineReducers({
  entities,
  lists,
});

export default rootReducer;
