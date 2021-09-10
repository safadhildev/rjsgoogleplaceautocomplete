import "./App.css";
import { Provider } from "react-redux";
import store from "./providers/store";
import Home from "./screens/Home";
import scriptLoader from "react-async-script-loader";

function App({ isScriptLoaded, isScriptLoadSucceed }) {
  if (isScriptLoaded && isScriptLoadSucceed)
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );

  return null;
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`,
])(App);
