/* eslint-disable no-undef */
import { all, put, takeLatest, call, select, take } from "redux-saga/effects";
import DataService from "../../services/DataService";
import {
  actions,
  predictionsError,
  predictionsSuccess,
} from "../actions/Predictions";

const getPredictions = async (search) => {
  const service = new google.maps.places.AutocompleteService();
  return await service.getPlacePredictions({ input: search });
};

function* sagaGetPredictions(action) {
  try {
    const response = yield call(getPredictions, action.value);
    const { predictions } = response;
    if (predictions) {
      yield put(predictionsSuccess(predictions));
    }
  } catch (e) {
    yield put(
      predictionsError({
        name: `Error :: ${e}`,
      })
    );
  }
}

export default function* Place() {
  yield all([takeLatest(actions.PREDICTIONS.REQUEST, sagaGetPredictions)]);
}
