import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../redux/reducers';
import { thunk } from 'redux-thunk';


const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;

export default store;