import { all, put, takeLatest, call, select, take } from "redux-saga/effects";
import DataService from "../../services/DataService";
import {
  actions,
  predictionsError,
  predictionsSuccess,
} from "../actions/Predictions";

const getPredictions = async (search) => {
  console.log("getPredictions :: ", search)
  return DataService.getPredictions(search);
};

function* sagaGetPredictions(action) {
  try {
    const response = yield call(getPredictions, action.value);
    console.log({ response });
    const { data, status } = response;
    if (status === 200) {
      yield put(predictionsSuccess(data.predictions));
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
