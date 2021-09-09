import { actions } from "../actions/Predictions";

const initialState = {
  success: false,
  errors: {},
  data: [],
};

const predictionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PREDICTIONS.REQUEST:
      return {
        ...state,
        errors: {},
      };
    case actions.PREDICTIONS.SUCCESS:
      return {
        ...state,
        success: true,
        data: action.payload,
      };
    case actions.PREDICTIONS.ERROR:
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

export default predictionsReducer;
