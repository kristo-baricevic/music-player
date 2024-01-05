import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../redux/reducers';


const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
