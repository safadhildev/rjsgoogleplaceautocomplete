import {all, put, takeLatest, call, select, take} from 'redux-saga/effects';
import DataService from '../../services/DataService';
import {actions, placeError, placeSuccess} from '../actions/Place';

const getPlace = async (relativeId, articleId) => {
  console.log('getPlace =>', {relativeId}, {articleId});
  return DataService.getData(`?libraries=""`);
};

function* sagaGetPlace(action) {
  try {
    const response = yield call(getPlace);
    const {data} = yield call(response.json(), response);
    yield put(placeSuccess(data));
  } catch (e) {
    yield put(
      placeError({
        name: `Error :: ${e}`,
      }),
    );
  }
}

export default function* Place() {
  yield all([takeLatest(actions.PLACE.REQUEST, sagaGetPlace)]);
}
