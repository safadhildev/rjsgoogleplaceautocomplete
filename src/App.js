import "./App.css";
import { Provider } from "react-redux";
import store from "./providers/store";
import Home from "./screens/Home";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
