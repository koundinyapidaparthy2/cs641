import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../store/authSlice';
import { loginUser as loginUserAPI, LoginPayloadInterface, LoginResponse } from '../api/loginApi';
import { PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Worker Saga: performs the login task
function* handleLogin(action: PayloadAction<LoginPayloadInterface>) {
  try {
    const response: LoginResponse = yield call(loginUserAPI, action.payload);
    const { token } = response;

    // Dispatch loginSuccess action with the received token
    yield AsyncStorage.setItem('authToken', token || "");
    yield put(loginSuccess({ token: token || '' }));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
    
  }
}

// Watcher Saga: watches for loginRequest actions and triggers handleLogin
function* loginSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default loginSaga;
