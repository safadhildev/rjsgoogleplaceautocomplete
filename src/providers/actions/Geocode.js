export const actions = {
  GEOCODE: {
    REQUEST: "GEOCODE_REQUEST",
    SUCCESS: "GEOCODE_SUCCESS",
    ERROR: "GEOCODE_ERROR",
  },
  RESET: "GEOCODE_RESET",
};

export const geocodeReset = () => ({
  type: actions.RESET,
});

export const geocodeRequest = (search) => ({
  type: actions.GEOCODE.REQUEST,
  value: search,
});

export const geocodeSuccess = (data) => ({
  type: actions.GEOCODE.SUCCESS,
  payload: data,
});
