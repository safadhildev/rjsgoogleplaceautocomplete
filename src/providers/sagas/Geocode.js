import { all, put, takeLatest, call } from "redux-saga/effects";
import DataService from "../../services/DataService";
import { actions, geocodeSuccess } from "../actions/Geocode";

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
  } catch (err) {
    console.log("Geocode - sagaGetGeocode - error :: ", err);
  }
}

export default function* Place() {
  yield all([takeLatest(actions.GEOCODE.REQUEST, sagaGetGeocode)]);
}
