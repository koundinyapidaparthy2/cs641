import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpRequest, signUpSuccess, signUpFailure } from '../store/authSlice';
import { signUpUser as signUpUserAPI, SignUpPayloadInterface, SignUpResponse } from '../api/signUpApi';
import { PayloadAction } from '@reduxjs/toolkit';

// Worker Saga: performs the sign-up task
function* handleSignUp(action: PayloadAction<SignUpPayloadInterface>) {
  try {
    
    const response: SignUpResponse = yield call(signUpUserAPI, action.payload);
    const { token } = response;
    // Dispatch signUpSuccess action with the received token
    yield put(signUpSuccess({ token: token || '' }));
  } catch (error: any) {
    console.error(error);
    yield put(signUpFailure(error.response?.data?.msg || 'SignUp failed'));
  }
}

// Watcher Saga: watches for signUpRequest actions and triggers handleSignUp
function* signUpSaga() {
  yield takeLatest(signUpRequest.type, handleSignUp);
}

export default signUpSaga;
