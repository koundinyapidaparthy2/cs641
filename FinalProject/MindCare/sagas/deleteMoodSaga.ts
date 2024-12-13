import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteMood } from '../api/deleteMood';
import { deleteMoodFailure, deleteMoodRequest, deleteMoodSuccess } from '../store/moodSlice';
// Saga for deleting a mood
function* deleteMoodSaga(action:  any) {
  try {
    const token: string = yield AsyncStorage.getItem('authToken'); // Get the token
    yield call(deleteMood, action.payload.moodId, token); // Call the API
    yield put(deleteMoodSuccess(action.payload.moodId)); // Update the state
  } catch (error: any) {
    yield put(deleteMoodFailure(error?.message)); // Handle the error
  }
}

// Root saga
export default function* moodSaga() {
  yield takeLatest(deleteMoodRequest.type, deleteMoodSaga);
}