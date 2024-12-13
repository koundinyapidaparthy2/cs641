// src/sagas/authSaga.ts

import { call, put, takeLatest } from 'redux-saga/effects';
import { initializeAuthRequest, initializeAuthSuccess, initializeAuthFailure } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Worker saga: load the token from AsyncStorage
function* initializeAuthSaga() {
  try {
    // AsyncStorage.getItem('authToken')
    const token: string | null = yield call(AsyncStorage.getItem, 'authToken');
    if (token) {
      console.log({token})
      yield put(initializeAuthSuccess(token)); // Dispatch success action
    } else {
      yield put(initializeAuthFailure('No token found'));
    }
  } catch (error) {
    console.error('Error loading token:', error);
    yield put(initializeAuthFailure('Failed to load token')); // Dispatch failure action
  }
}

// Watcher saga: watch for initializeAuthRequest action to call initializeAuth
function* watchInitializeAuth() {
  yield takeLatest(initializeAuthRequest.type, initializeAuthSaga);
}

export default watchInitializeAuth;
