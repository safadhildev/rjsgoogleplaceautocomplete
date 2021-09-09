import { combineReducers } from "redux";
import predictionsReducer from "./Predictions";
import geocodeReducer from "./Geocode";

export default combineReducers({ predictionsReducer, geocodeReducer });
