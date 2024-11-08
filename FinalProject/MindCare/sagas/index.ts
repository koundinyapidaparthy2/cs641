import { all, fork } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import signUpSaga from './signUpSaga';

const forks = [
    loginSaga,
    signUpSaga
]
// Root saga that forks all individual sagas
export default function* rootSaga() {
  yield all(forks.map((currFork)=>fork(currFork)));
}
