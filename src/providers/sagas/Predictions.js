/* eslint-disable no-undef */
import { all, put, takeLatest, call } from "redux-saga/effects";
import { actions, predictionsSuccess } from "../actions/Predictions";

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
  } catch (err) {
    console.log("Predictions - sagaGetPredictions - err :: ", err);
  }
}

export default function* Place() {
  yield all([takeLatest(actions.PREDICTIONS.REQUEST, sagaGetPredictions)]);
}
