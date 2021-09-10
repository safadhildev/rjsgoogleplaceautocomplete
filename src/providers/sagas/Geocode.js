import { all, put, takeLatest, call, select, take } from "redux-saga/effects";
import DataService from "../../services/DataService";
import { actions, geocodeError, geocodeSuccess } from "../actions/Geocode";

const getGeocode = async (id) => {
  return DataService.getLocationById(id);
};

function* sagaGetGeocode(action) {
  try {
    const response = yield call(getGeocode, action.value);
    const { data, status } = response;
    if (status === 200) {
      const { geometry } = data?.results[0];
      yield put(geocodeSuccess(geometry?.location));
    }
  } catch (e) {
    yield put(
      geocodeError({
        name: `Error :: ${e}`,
      })
    );
  }
}

export default function* Place() {
  yield all([takeLatest(actions.GEOCODE.REQUEST, sagaGetGeocode)]);
}
