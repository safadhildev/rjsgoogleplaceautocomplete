import { actions } from "../actions/Place";

const initialState = {
  loading: false,
  success: false,
  errors: {},
  data: [],
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLACE.REQUEST:
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case actions.PLACE.SUCCESS:
      return {
        ...state,
        loading: true,
        success: true,
        data: action.payload,
      };
    case actions.PLACE.ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload,
      };
    case actions.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default placeReducer;
