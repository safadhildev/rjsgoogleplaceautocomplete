import { all, takeLatest } from "@redux-saga/core/effects";
import Predictions from "./Predictions";
import Geocode from "./Geocode";

export default function* rootSaga() {
  yield all([Predictions(), Geocode()]);
}
