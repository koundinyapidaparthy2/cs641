import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'; // Make sure this path matches your rootSaga file location

const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),

});

sagaMiddleware.run(rootSaga);


// Define RootState and AppDispatch types for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
