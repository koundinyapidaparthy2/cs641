// src/sagas/moodSaga.ts

import { call, put, takeLatest } from 'redux-saga/effects';
import { MoodData, saveMood } from '../api/saveMood';
import { saveMoodRequest, saveMoodSuccess, saveMoodFailure } from '../store/moodSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* handleSaveMood(action: PayloadAction<MoodData>) {
  try {
    yield call(saveMood, action.payload); // Call the API with mood data
    yield put(saveMoodSuccess()); // Dispatch success action
  } catch (error: any) {
    const errorMessage = error.message === "Token is not valid";
    console.log({errorMessage})
    if(errorMessage) {
      yield AsyncStorage.setItem('authToken',  "");
      // yield put(logOut());
      yield put(saveMoodFailure(error.message)); // Dispatch failure action with error message
    }
  }
}

export default function* watchSaveMood() {
  yield takeLatest(saveMoodRequest.type, handleSaveMood);
}
