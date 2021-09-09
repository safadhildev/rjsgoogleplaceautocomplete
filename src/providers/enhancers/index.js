import { applyMiddleware } from "redux";
import sagaMiddleware from "./middlewares";

export default applyMiddleware(sagaMiddleware);
