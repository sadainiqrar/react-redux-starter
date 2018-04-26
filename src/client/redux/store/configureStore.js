import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';

export default function configureStore() {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
