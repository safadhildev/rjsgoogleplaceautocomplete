import { actions } from "../actions/Geocode";

const initialState = {
  success: false,
  errors: {},
  data: [],
};

const geocodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GEOCODE.REQUEST:
      return {
        ...state,
        errors: {},
      };
    case actions.GEOCODE.SUCCESS:
      return {
        ...state,
        success: true,
        data: action.payload,
      };
    case actions.GEOCODE.ERROR:
      return {
        ...state,
        success: false,
        errors: action.payload,
      };
    case actions.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default geocodeReducer;
