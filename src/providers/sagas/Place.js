import { all, put, takeLatest, call, select, take } from "redux-saga/effects";
import DataService from "../../services/DataService";
import { actions, placeError, placeSuccess } from "../actions/Place";

const getPlace = async (search) => {
  return DataService.getPlaces(search);
};

function* sagaGetPlace(action) {
  try {
    const response = yield call(getPlace, action.value);
    const { data, status } = response;
    if (status === 200) {
      yield put(placeSuccess(data.predictions));
    }
  } catch (e) {
    yield put(
      placeError({
        name: `Error :: ${e}`,
      })
    );
  }
}

export default function* Place() {
  yield all([takeLatest(actions.PLACE.REQUEST, sagaGetPlace)]);
}
