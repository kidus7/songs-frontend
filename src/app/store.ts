import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from '../feature/songs/services/songsSlice';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {   
        songs: songsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  
  sagaMiddleware.run(rootSaga);
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;