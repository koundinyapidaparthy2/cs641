import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpRequest, loginSuccess, loginFailure } from '../store/authSlice';
import { signUpUser as signUpUserAPI, SignUpPayloadInterface, SignUpResponse } from '../api/signUpApi';
import { PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Worker Saga: performs the sign-up task
function* handleSignUp(action: PayloadAction<SignUpPayloadInterface>) {
  try {
    
    const response: SignUpResponse = yield call(signUpUserAPI, action.payload);
    const { token } = response;
    // Dispatch signUpSuccess action with the received token
    yield AsyncStorage.setItem('authToken', token || "");

    yield put(loginSuccess({ token: token || '' }));
  } catch (error: any) {
    console.error(error);
    yield put(loginFailure(error.response?.data?.msg || 'SignUp failed'));
  }
}

// Watcher Saga: watches for signUpRequest actions and triggers handleSignUp
function* signUpSaga() {
  yield takeLatest(signUpRequest.type, handleSignUp);
}

export default signUpSaga;
