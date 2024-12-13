import { all, fork } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import signUpSaga from './signUpSaga';
import authCheckSaga from './authCheckSaga';
import moodSaga from './saveMoodSaga';
import getMoodSaga from './getMoodSaga';
import deleteMoodSaga from './deleteMoodSaga';
const forks = [
    loginSaga,
    signUpSaga,
    authCheckSaga,
    moodSaga,
    getMoodSaga,
    deleteMoodSaga
]
// Root saga that forks all individual sagas
export default function* rootSaga() {
  yield all(forks.map((currFork)=>fork(currFork)));
}
