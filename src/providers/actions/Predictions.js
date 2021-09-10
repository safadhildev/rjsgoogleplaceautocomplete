export const actions = {
  PREDICTIONS: {
    REQUEST: "PREDICTIONS_REQUEST",
    SUCCESS: "PREDICTIONS_SUCCESS",
    ERROR: "PREDICTIONS_ERROR",
  },
  RESET: "PREDICTIONS_RESET",
};

export const predictionsReset = () => ({
  type: actions.RESET,
});

export const predictionsRequest = (search) => ({
  type: actions.PREDICTIONS.REQUEST,
  value: search,
});

export const predictionsSuccess = (data) => ({
  type: actions.PREDICTIONS.SUCCESS,
  payload: data,
});
