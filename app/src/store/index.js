import { configureStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  // your reducers go here
});

export const store = configureStore(rootReducer, applyMiddleware(thunk));
