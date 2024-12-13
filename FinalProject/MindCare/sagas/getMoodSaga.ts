import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMoodsRequest, fetchMoodsSuccess, fetchMoodsFailure } from '../store/moodSlice';
import { getMoods } from '../api/getMoods'; // Ensure correct import path
import { AxiosResponse } from 'axios'; // Import AxiosResponse type
import { logOut } from '../store/authSlice';

function* handleFetchMoods() {
  try {
    const token: string | null = yield call(AsyncStorage.getItem, 'authToken');
    
    if (token) {
      const response: AxiosResponse<any> = yield call(getMoods); // Ensure correct response type
      yield put(fetchMoodsSuccess(response.data.moods));
    } else {
      yield put(fetchMoodsFailure('No authentication token found.'));
    }

  } catch (error: any) {
    if(error.message === "Unauthorized" || error.message === "Token is not valid") {
        yield put(logOut())
    }
    yield put(fetchMoodsFailure(error.message || 'Failed to fetch moods'));
  }
}

export default function* watchFetchMoods() {
  yield takeLatest(fetchMoodsRequest.type, handleFetchMoods);
}
