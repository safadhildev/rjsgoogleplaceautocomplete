import {all, takeLatest} from '@redux-saga/core/effects';
import Place from './Place';

export default function* rootSaga() {
  yield all([Place()]);
}
