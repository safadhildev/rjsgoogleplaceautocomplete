export const actions = {
  PLACE: {
    REQUEST: 'PLACE_REQUEST',
    SUCCESS: 'PLACE_SUCCESS',
    ERROR: 'PLACE_ERROR',
  },
  RESET: 'PLACE_RESET',
};

export const placeReset = () => ({
  type: actions.RESET,
});

export const placeRequest = id => ({
  type: actions.PLACE.REQUEST,
  id,
});

export const placeSuccess = data => ({
  type: actions.PLACE.SUCCESS,
  payload: data,
});

export const placeError = errors => ({
  type: actions.PLACE.ERROR,
  payload: errors,
});
